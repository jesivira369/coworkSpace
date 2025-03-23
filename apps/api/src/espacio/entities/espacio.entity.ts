import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsNotEmpty, IsOptional, IsNumber, IsString } from 'class-validator';

@Entity()
export class Espacio {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  nombre!: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  ubicacion!: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  capacidad!: number;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
