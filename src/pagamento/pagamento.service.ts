import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EventsGateway } from 'src/events/events.gateway';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';

@Injectable()
export class PagamentoService {
  constructor(
    private prisma: PrismaService,
    private eventsGateway: EventsGateway,
  ) {}

  async confirmarPagamento(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const pagamento = await this.prisma.pagamento.update({
      where: { id },
      data: { status: 'PAGO' },
      include: { pedido: true },
    });

    // (Opcional) Atualiza o status do pedido também

    await this.prisma.pedido.update({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      where: { id: pagamento.pedidoId },
      data: { status: 'PAGO' },
    });

    // 🚀 Notifica via socket
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    this.eventsGateway.notificarConfirmacao(pagamento.pedido.userId, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      pedidoId: pagamento.pedidoId,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      pagamentoId: pagamento.id,
      status: 'PAGO',
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return pagamento;
  }

  async create(createPagamentoDto: CreatePagamentoDto, pedidoId: string) {
    const { metodo } = createPagamentoDto;
    // pedidoId é uma string, mas o Prisma espera um número
    const pedidoIdNumber = Number(pedidoId);
    await this.prisma.pedido.update({
      where: { id: pedidoIdNumber },
      data: { status: 'PAGO' },
    });
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const pagamento = await this.prisma.pagamento.create({
      data: {
        metodo,
        pedido: {
          connect: { id: pedidoIdNumber },
        },
      },
      include: { pedido: true },
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return pagamento;
  }

  findAll() {
    return `This action returns all pagamento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pagamento`;
  }

  update(id: number, updatePagamentoDto: UpdatePagamentoDto) {
    return `This action updates a #${id} pagamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} pagamento`;
  }
}
