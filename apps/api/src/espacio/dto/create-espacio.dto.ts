import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEnum,
  MaxLength,
  Min,
  Max,
  IsNumber,
} from 'class-validator';
import { UbicacionEspacio } from '../enums/ubicacion.enum';

export class CreateEspacioDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  nombre!: string;

  @IsNotEmpty()
  @IsEnum(UbicacionEspacio)
  ubicacion!: UbicacionEspacio;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(50)
  capacidad!: number;

  @IsOptional()
  @IsString()
  @MaxLength(200)
  descripcion?: string;
}
