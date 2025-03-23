import { Espacio } from './espacio';

export interface Reserva {
  id: number;
  espacioId: number;
  espacio: Espacio;
  emailCliente: string;
  fechaReserva: string;
  horaInicio: string;
  horaFin: string;
}
