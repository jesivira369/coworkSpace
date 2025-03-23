import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateReservaDto {
  @IsNotEmpty()
  @IsEmail()
  emailCliente!: string;

  @IsNotEmpty()
  espacioId!: number;

  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'La fecha debe estar en formato ISO (YYYY-MM-DD)',
  })
  fechaReserva!: string;

  @IsNotEmpty()
  @IsString()
  horaInicio!: string;

  @IsNotEmpty()
  @IsString()
  horaFin!: string;
}
