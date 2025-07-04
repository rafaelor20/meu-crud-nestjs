import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { EventsModule } from 'src/events/events.module'; // <== importa o módulo

@Module({
  imports: [EventsModule], // <== adiciona o módulo aqui
  controllers: [PagamentoController],
  providers: [PagamentoService],
})
export class PagamentoModule {}
