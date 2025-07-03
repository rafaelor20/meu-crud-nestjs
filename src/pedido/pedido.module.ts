import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProdutoModule } from '../produto/produto.module'; // Import the ProdutoModule

@Module({
  imports: [PrismaModule, ProdutoModule], // Add any necessary modules here, e.g., PrismaModule
  controllers: [PedidoController],
  providers: [PedidoService],
})
export class PedidoModule {}
