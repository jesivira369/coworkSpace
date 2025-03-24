// apps/api/jest.setup.ts
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({
  path: resolve(__dirname, '../../.env.test'),
});
