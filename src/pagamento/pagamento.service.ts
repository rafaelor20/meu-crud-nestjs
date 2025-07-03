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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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

  create(createPagamentoDto: CreatePagamentoDto) {
    return 'This action adds a new pagamento';
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
