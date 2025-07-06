import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return pagamento;
  }

  async create(createPagamentoDto: CreatePagamentoDto) {
    const { pedidoId, metodo } = createPagamentoDto;

    const pedido = await this.prisma.pedido.findUnique({
      where: { id: pedidoId },
    });

    await this.prisma.pedido.update({
      where: { id: pedidoId },
      data: { status: 'PAGO' },
    });

    if (!pedido) throw new NotFoundException('Pedido não encontrado');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    if (await this.prisma.pagamento.findUnique({ where: { pedidoId } })) {
      throw new BadRequestException('Pagamento já existe para este pedido');
    }

    // 🔗 Simula integração com API externa (Mercado Pago, Stripe, etc)
    const fakeGatewayResponse = {
      transacaoId: 'tx_' + Math.random().toString(36).substring(2),
      qrCode: metodo === 'PIX' ? '00020126330014...' : null,
      linkPagamento:
        metodo !== 'PIX' ? 'https://pagamento.fakegateway.com/tx123' : null,
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const pagamento = await this.prisma.pagamento.create({
      data: {
        metodo,
        pedido: { connect: { id: pedidoId } },
        transacaoId: fakeGatewayResponse.transacaoId,
        qrCode: fakeGatewayResponse.qrCode,
        linkPagamento: fakeGatewayResponse.linkPagamento,
      },
    });

    const userId = await this.prisma.pedido.findUnique({
      where: { id: pedidoId },
      select: { userId: true },
    });

    // 🚀 Notifica via socket
    this.eventsGateway.notificarConfirmacao(userId!.userId, {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      pedidoId: pagamento.pedidoId,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      pagamentoId: pagamento.id,
      status: 'PAGO',
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      pagamentoId: pagamento.id,
      pedidoId: pedidoId,
      metodo,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      ...(pagamento.qrCode && { qrCode: pagamento.qrCode }),
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      ...(pagamento.linkPagamento && { link: pagamento.linkPagamento }),
    };
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
