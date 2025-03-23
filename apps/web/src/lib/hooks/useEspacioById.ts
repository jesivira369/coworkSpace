import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import { Espacio } from '../interfaces/espacio';

export const getEspacioById = async (id: string): Promise<Espacio> => {
  const response = await api.get(`/espacios/${id}`);
  return response.data;
};

export const useEspacioById = (id: string) => {
  return useQuery({
    queryKey: ['espacio', id],
    queryFn: () => getEspacioById(id),
    enabled: !!id,
  });
};
