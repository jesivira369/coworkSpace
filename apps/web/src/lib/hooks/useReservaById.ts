import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { Reserva } from '../interfaces/reserva';

export const getReservaById = async (id: string): Promise<Reserva> => {
  const response = await api.get(`/reservas/${id}`);
  return response.data;
};

export const useReservaById = (id: string) => {
  return useQuery({
    queryKey: ['reserva', id],
    queryFn: () => getReservaById(id),
    enabled: !!id,
  });
};
