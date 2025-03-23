import { LessThanOrEqual, MoreThanOrEqual, Between } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './entities/reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { CrudRequest, ParsedRequest } from '@dataui/crud';
import { Espacio } from '../espacio/entities/espacio.entity';

@Injectable()
export class ReservaService extends TypeOrmCrudService<Reserva> {
  constructor(
    @InjectRepository(Reserva) repo: Repository<Reserva>,
    @InjectRepository(Espacio) private readonly espacioRepo: Repository<Espacio>
  ) {
    super(repo);
  }

  async createOne(
    @ParsedRequest() req: CrudRequest,
    dto: CreateReservaDto
  ): Promise<Reserva> {
    const { espacioId, emailCliente, fechaReserva, horaInicio, horaFin } = dto;

    const espacioExiste = await this.espacioRepo.findOne({
      where: { id: espacioId },
    });

    if (!espacioExiste) {
      throw new BadRequestException(
        `El espacio con ID ${espacioId} no existe.`
      );
    }

    const conflictos = await this.repo.find({
      where: {
        espacio: { id: espacioId },
        fechaReserva,
        horaInicio: LessThanOrEqual(horaFin),
        horaFin: MoreThanOrEqual(horaInicio),
      },
    });

    if (conflictos.length > 0) {
      throw new BadRequestException(
        'Ya existe una reserva que se cruza con ese horario en este espacio.'
      );
    }

    const date = new Date(fechaReserva);
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const reservasSemana = await this.repo.find({
      where: {
        emailCliente,
        fechaReserva: Between(
          startOfWeek.toISOString().split('T')[0],
          endOfWeek.toISOString().split('T')[0]
        ),
      },
    });

    if (reservasSemana.length >= 3) {
      throw new BadRequestException(
        'Solo se permiten 3 reservas por semana para este cliente.'
      );
    }

    return super.createOne(req, dto);
  }
}
