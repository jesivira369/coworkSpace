import { Test, TestingModule } from '@nestjs/testing';
import { EspacioService } from './espacio.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Espacio } from './entities/espacio.entity';

describe('EspacioService', () => {
  let service: EspacioService;

  // Mock mínimo requerido por TypeOrmCrudService
  const mockRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    // propiedades mínimas necesarias para TypeOrmCrudService
    metadata: { columns: [], relations: [] },
    manager: { transaction: jest.fn() },
    target: {},
    createQueryBuilder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EspacioService,
        {
          provide: getRepositoryToken(Espacio),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<EspacioService>(EspacioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
