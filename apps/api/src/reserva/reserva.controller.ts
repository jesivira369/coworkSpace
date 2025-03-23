import { Controller } from '@nestjs/common';
import { Reserva } from './entities/reserva.entity';
import { ReservaService } from './reserva.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';
import {
  Crud,
  CrudController,
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@dataui/crud';

@Crud({
  model: { type: Reserva },
  dto: {
    create: CreateReservaDto,
    update: UpdateReservaDto,
  },
  routes: {
    only: [
      'getOneBase',
      'getManyBase',
      'createOneBase',
      'updateOneBase',
      'deleteOneBase',
    ],
  },
})
@Controller('reservas')
export class ReservaController implements CrudController<Reserva> {
  constructor(public service: ReservaService) {}

  get base(): CrudController<Reserva> {
    return this;
  }

  @Override()
  createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: Reserva) {
    if (this.base && this.base.createOneBase) {
      return this.base.createOneBase(req, dto);
    }
    throw new Error('Base controller is not defined');
  }
}
