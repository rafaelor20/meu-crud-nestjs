import { IsString, IsNumber, Min } from 'class-validator';

export class CreateProdutoDto {
  @IsNumber()
  @Min(1)
  categoriaId: number;

  @IsString()
  nome: string;

  @IsNumber()
  @Min(0)
  preco: number;
}
