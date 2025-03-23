import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ApiKeyMiddleware } from './common/middleware/api-key.middleware';
import { config } from 'dotenv';
config({ path: `${process.cwd()}/.env` });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    origin: 'http://localhost:4000',
    credentials: true,
  });
  const port = process.env.API_PORT || 3001;
  app.use(new ApiKeyMiddleware().use);
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
