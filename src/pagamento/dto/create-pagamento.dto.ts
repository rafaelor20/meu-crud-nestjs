import { IsString } from 'class-validator';

export class CreatePagamentoDto {
  @IsString()
  metodo: string;
}
