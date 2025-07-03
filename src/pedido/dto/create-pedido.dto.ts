import { Type } from 'class-transformer';
import { IsArray, ValidateNested, IsNumber } from 'class-validator';

class PedidoItemDto {
  @IsNumber()
  produtoId: number;

  @IsNumber()
  quantidade: number;
}

export class CreatePedidoDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PedidoItemDto)
  itens: PedidoItemDto[];
}
