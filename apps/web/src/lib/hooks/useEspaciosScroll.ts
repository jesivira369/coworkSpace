import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from '../api';
import { Espacio } from '../interfaces/espacio';

const fetchEspacios = async ({
  pageParam = 1,
}): Promise<{ data: Espacio[]; totalPages: number }> => {
  const res = await api.get(`/espacios?page=${pageParam}&limit=10`);
  return res.data;
};

export function useEspaciosScroll() {
  return useInfiniteQuery({
    queryKey: ['espacios-scroll'],
    queryFn: fetchEspacios,
    getNextPageParam: (lastPage, allPages) => {
      const next = allPages.length + 1;
      return next <= lastPage.totalPages ? next : undefined;
    },
    select: (data) => ({
      pages: data.pages,
      pageParams: data.pageParams,
      data: data.pages.flatMap((page) => page.data),
    }),
    initialPageParam: 1,
  });
}
