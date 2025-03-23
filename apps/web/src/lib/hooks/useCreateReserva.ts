import { api } from '../api';

export interface CreateReservaInput {
  espacioId: string;
  emailCliente: string;
  fechaReserva: string;
  horaInicio: string;
  horaFin: string;
}

export async function createReserva(data: CreateReservaInput) {
  const res = await api.post('/reservas', data);
  return res.data;
}
