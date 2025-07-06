import { IsEnum } from 'class-validator';
import { MetodoPagamento } from '@prisma/client';

export class CreatePagamentoDto {
  pedidoId: number;

  @IsEnum(MetodoPagamento)
  metodo: 'PIX' | 'CARTAO' | 'BOLETO';

  pagador: {
    nome: string;
    cpf: string;
    email: string;
  };
}
