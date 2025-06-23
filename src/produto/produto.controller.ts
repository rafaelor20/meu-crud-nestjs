import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ValidationPipe, UsePipes } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @Get()
  findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
