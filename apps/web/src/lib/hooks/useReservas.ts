import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { parseQueryParams } from '../query-params';
import { Reserva } from '../interfaces/reserva';

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageCount: number;
}

export const getReservas = async (
  params?: Record<string, any>
): Promise<PaginatedResponse<Reserva>> => {
  const query = params ? parseQueryParams(params) : '';
  const response = await api.get(`/reservas${query}`);
  return response.data;
};

export const useReservas = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['reservas', params],
    queryFn: () => getReservas(params),
  });
};
