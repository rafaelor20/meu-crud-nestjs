import { IsString, IsNumber, Min } from 'class-validator';

export class CreateProdutoDto {
  @IsString()
  nome: string;

  @IsNumber()
  @Min(0)
  preco: number;
}
