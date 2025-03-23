// web/src/lib/hooks/useEspacios.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { parseQueryParams } from '../query-params';
import { Espacio } from '../interfaces/espacio';

export const getEspacios = async (
  params?: Record<string, any>
): Promise<Espacio[]> => {
  const query = params ? parseQueryParams(params) : '';
  const response = await api.get(`/espacios${query}`);
  return response.data;
};

export const useEspacios = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['espacios', params],
    queryFn: () => getEspacios(params),
  });
};
