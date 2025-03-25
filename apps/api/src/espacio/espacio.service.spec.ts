import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Espacio } from './entities/espacio.entity';
import { EspacioService } from './espacio.service';
import { Reserva } from '../reserva/entities/reserva.entity';

describe('EspacioService', () => {
  let service: EspacioService;
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
          entities: [Espacio, Reserva],
          synchronize: true,
          dropSchema: true,
          logging: false,
        }),
        TypeOrmModule.forFeature([Espacio]),
      ],
      providers: [EspacioService],
    }).compile();

    service = moduleRef.get(EspacioService);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new espacio', async () => {
    const dto = {
      nombre: 'Oficina Compartida',
      capacidad: 10,
      descripcion: 'Oficina compartida para 10 personas',
      ubicacion: 'PB',
    };

    const espacio = await service['repo'].save(dto);
    expect(espacio.id).toBeDefined();
    expect(espacio.nombre).toBe('Oficina Compartida');
  });
});
