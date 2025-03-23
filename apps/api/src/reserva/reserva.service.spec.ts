import { Test, TestingModule } from '@nestjs/testing';
import { ReservaService } from './reserva.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { Espacio } from '../espacio/entities/espacio.entity';
import { ReservaModule } from './reserva.module';

describe('ReservaService', () => {
  let service: ReservaService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'test',
          database: 'reserva_test',
          entities: [Reserva, Espacio],
          synchronize: true,
          dropSchema: true,
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
});
