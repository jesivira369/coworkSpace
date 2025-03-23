import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { Repository } from 'typeorm';
import { Espacio } from './entities/espacio.entity';

@Injectable()
export class EspacioService extends TypeOrmCrudService<Espacio> {
  constructor(@InjectRepository(Espacio) repo: Repository<Espacio>) {
    super(repo);
  }
}
