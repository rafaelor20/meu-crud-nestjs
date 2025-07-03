import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ProdutoService } from '../produto/produto.service';
import { Item } from '../interfaces/item.interface';
import { Produto } from '../interfaces/produto.interface';

@Injectable()
export class PedidoService {
  constructor(
    private readonly produtoService: ProdutoService,
    private readonly prisma: PrismaService,
  ) {}

  calcularTotalPedido(itens: Item[], produtos: Produto[]): number {
    return itens.reduce((total, item) => {
      const produto = produtos.find((p) => p.id === item.produtoId);
      if (!produto) {
        throw new Error(`Produto com ID ${item.produtoId} não encontrado.`);
      }
      return total + produto.preco * item.quantidade;
    }, 0);
  }

  async create(createPedidoDto: CreatePedidoDto, userId: number) {
    const { itens } = createPedidoDto;
    // pegue produtos do pedido
    const produtos = await Promise.all(
      itens.map((item) => this.produtoService.findOne(item.produtoId)),
    );
    // calcule o preco total
    const precoTotal = this.calcularTotalPedido(itens, produtos);
    // crie o pedido com o preco totale pedidoItems
    // Adicione o userId ao DTO ou obtenha de outro lugar, aqui assumimos que está em createPedidoDto
    const pedido = (await this.prisma.pedido.create({
      data: {
        precoTotal,
        user: {
          connect: { id: userId }, // Certifique-se de que userId está presente em createPedidoDto
        },
        itens: {
          create: itens.map((item) => ({
            produtoId: item.produtoId,
            quantidade: item.quantidade,
          })),
        },
      },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
      },
    })) as {
      id: number;
      status: string;
      createdAt: Date;
      precoTotal: number;
      userId: number;
      itens: Array<{
        id: number;
        pedidoId: number;
        produtoId: number;
        quantidade: number;
        produto: {
          id: number;
          nome: string;
          preco: number;
        };
      }>;
    };
    return {
      ...pedido,
      pedidoItems: pedido.itens.map((item) => ({
        ...item,
        produto: {
          id: item.produto.id,
          nome: item.produto.nome,
          preco: item.produto.preco,
        },
      })),
    };
  }

  findAll() {
    return `This action returns all pedido`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pedido`;
  }

  update(id: number, updatePedidoDto: UpdatePedidoDto) {
    return `This action updates a #${id} pedido`;
  }

  remove(id: number) {
    return `This action removes a #${id} pedido`;
  }
}
