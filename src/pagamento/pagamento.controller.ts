import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { EventsGateway } from 'src/events/events.gateway';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';

@Controller('pagamento')
export class PagamentoController {
  constructor(
    private readonly pagamentoService: PagamentoService,
    private eventsGateway: EventsGateway,
  ) {}

  @Post('/:pedidoId')
  create(
    @Param('pedidoId') pedidoId: string,
    @Body() createPagamentoDto: CreatePagamentoDto,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this.pagamentoService.create(createPagamentoDto, pedidoId);
  }

  @Get()
  findAll() {
    return this.pagamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagamentoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePagamentoDto: UpdatePagamentoDto,
  ) {
    return this.pagamentoService.update(+id, updatePagamentoDto);
  }

  @Patch('/confirmar/:id')
  confirmar(@Param('id') id: string) {
    return this.pagamentoService.confirmarPagamento(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagamentoService.remove(+id);
  }
}
