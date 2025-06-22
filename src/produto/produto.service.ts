import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateProdutoDto) {
    return this.prisma.produto.create({ data });
  }

  findAll() {
    return this.prisma.produto.findMany();
  }

  async findOne(id: number) {
    const produto = await this.prisma.produto.findUnique({ where: { id } });
    if (!produto) throw new NotFoundException(`Produto ${id} não encontrado`);
    return produto;
  }

  async update(id: number, data: UpdateProdutoDto) {
    await this.findOne(id); // valida existência
    return this.prisma.produto.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id); // valida existência
    return this.prisma.produto.delete({
      where: { id },
    });
  }
}
