type QueryOperators = 'eq' | 'like' | 'in' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte';

type QueryValue = string | number | boolean | Array<string | number>;

interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  join?: string[];
  filter?: Record<string, { operator?: QueryOperators; value: QueryValue }>;
}

export function parseQueryParams(params: QueryParams): string {
  const query = new URLSearchParams();

  // Parámetros normales como page, limit, sort, join
  if (params.page) query.append('page', String(params.page));
  if (params.limit) query.append('limit', String(params.limit));
  if (params.sort) query.append('sort', params.sort);
  if (params.join) {
    params.join.forEach((j) => query.append('join[]', j));
  }

  // Filtros
  if (params.filter) {
    for (const [field, filterObj] of Object.entries(params.filter)) {
      const operator = filterObj.operator ?? 'eq';
      const value = Array.isArray(filterObj.value)
        ? filterObj.value.join(',')
        : String(filterObj.value);

      query.append('filter', `${field}$${operator}${value}`);
    }
  }

  return `?${query.toString()}`;
}
