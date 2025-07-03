import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ProdutoModule } from './produto/produto.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoriaModule } from './categoria/categoria.module';
import { UploadModule } from './upload/upload.module';
import { PedidoModule } from './pedido/pedido.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { EventsGateway } from './events/events.gateway';

@Module({
  imports: [
    PrismaModule,
    ProdutoModule,
    AuthModule,
    UserModule,
    CategoriaModule,
    UploadModule,
    PedidoModule,
    PagamentoModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
