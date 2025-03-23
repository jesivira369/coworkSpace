export function parseQueryParams<T extends Record<string, any>>(
  params: T
): string {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, String(value));
    }
  });
  return `?${query.toString()}`;
}
