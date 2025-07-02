import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutoModule } from './produto/produto.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoriaModule } from './categoria/categoria.module';

@Module({
  imports: [PrismaModule, ProdutoModule, AuthModule, UserModule, CategoriaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
