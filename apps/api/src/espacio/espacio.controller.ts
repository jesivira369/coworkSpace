import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { Espacio } from './entities/espacio.entity';
import { EspacioService } from './espacio.service';
import { CreateEspacioDto } from './dto/create-espacio.dto';
import { UpdateEspacioDto } from './dto/update-espacio.dto';

@Crud({
  model: { type: Espacio },
  dto: {
    create: CreateEspacioDto,
    update: UpdateEspacioDto,
  },
})
@Controller('espacios')
export class EspacioController implements CrudController<Espacio> {
  constructor(public service: EspacioService) {}

  get base(): CrudController<Espacio> {
    return this;
  }
}
