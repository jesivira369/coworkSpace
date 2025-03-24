import { http, HttpResponse } from 'msw';
import { mockEspacios, mockReservas } from './data';

const apiUrl = 'http://localhost:3001/api';

export const handlers = [
  http.get(`${apiUrl}/espacios`, () => {
    return HttpResponse.json(mockEspacios);
  }),

  http.get(`${apiUrl}/espacios/:id`, ({ params }) => {
    const espacio = mockEspacios.find((e) => e.id === Number(params.id));
    return espacio
      ? HttpResponse.json(espacio)
      : new HttpResponse('Not Found', { status: 404 });
  }),

  http.get(`${apiUrl}/reservas`, ({ request }) => {
    const url = new URL(request.url);
    const espacioId = url.searchParams.get('espacioId');
    const filtered = espacioId
      ? mockReservas.filter((r) => r.espacioId === Number(espacioId))
      : mockReservas;

    return HttpResponse.json({
      data: filtered,
      count: filtered.length,
      page: 1,
      pageCount: 1,
    });
  }),
];
