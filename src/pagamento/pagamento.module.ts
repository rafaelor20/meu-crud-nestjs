import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { EventsGateway } from '../events/events.gateway';

@Module({
  controllers: [PagamentoController],
  providers: [PagamentoService, EventsGateway],
})
export class PagamentoModule {}
