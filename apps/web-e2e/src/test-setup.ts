import { server } from './mocks/mockServer';

export default async function globalSetup() {
  server.listen({ onUnhandledRequest: 'warn' });

  // Limpia los handlers después de cada test si lo necesitás
  return async () => {
    server.close();
  };
}
