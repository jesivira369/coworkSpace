import { api } from '../api';
import { CreateReservaInput } from './useCreateReserva';

export async function editReserva(data: CreateReservaInput) {
  const res = await api.patch('/reservas', data);
  return res.data;
}
