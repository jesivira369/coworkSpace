import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EspacioModule } from '../espacio/espacio.module';
import { ReservaModule } from '../reserva/reserva.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 3307,
      username: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'admin',
      database: process.env.DB_NAME || 'reserva_db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    EspacioModule,
    ReservaModule,
  ],
})
export class AppModule {}
