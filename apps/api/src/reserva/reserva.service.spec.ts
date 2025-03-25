import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaService } from './reserva.service';
import { Reserva } from './entities/reserva.entity';
import { Espacio } from '../espacio/entities/espacio.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';

describe('ReservaService', () => {
  let service: ReservaService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          entities: [Reserva, Espacio],
          dropSchema: true,
          logging: false,
        }),
        TypeOrmModule.forFeature([Reserva, Espacio]),
      ],
      providers: [ReservaService],
    }).compile();

    service = moduleRef.get(ReservaService);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a valid reserva', async () => {
    const espacioRepo = moduleRef.get('EspacioRepository');
    const espacio = await espacioRepo.save({
      nombre: 'Sala A',
      capacidad: 5,
      descripcion: 'Una sala de prueba',
      ubicacion: 'PB',
    });

    const dto: CreateReservaDto = {
      emailCliente: 'cliente@test.com',
      espacioId: espacio.id,
      fechaReserva: '2025-03-25',
      horaInicio: '14:00',
      horaFin: '15:00',
    };

    const reserva = await service['repo'].save(dto);

    expect(reserva.id).toBeDefined();
    expect(reserva.emailCliente).toBe('cliente@test.com');
    expect(reserva.espacioId).toBe(espacio.id);
  });
});
