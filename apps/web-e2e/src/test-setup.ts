import { server } from './mocks/mockServer';

export default async function globalSetup() {
  server.listen({ onUnhandledRequest: 'warn' });

  return async () => {
    server.close();
  };
}
