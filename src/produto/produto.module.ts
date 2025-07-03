import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';

@Module({
  imports: [PrismaModule],
  controllers: [ProdutoController],
  providers: [ProdutoService],
  exports: [ProdutoService], // Export the service to be used in other modules
})
export class ProdutoModule {}
