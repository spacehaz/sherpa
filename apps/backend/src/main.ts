/**
 * main.ts
 * Entry point of the NestJS application.
 * Bootstraps the app, sets global prefix, validation pipe, and starts the HTTP server.
 */

// Must be imported before anything else — registers the metadata storage
// that NestJS decorators and DI rely on at runtime
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // All routes will be prefixed with /api (e.g. /api/offers, /api/auth)
  app.setGlobalPrefix('api');

  // Global validation pipe — applied to every incoming request body
  // whitelist: strips properties not defined in the DTO
  // forbidNonWhitelisted: throws 400 if client sends fields not in the DTO (security measure)
  // transform: auto-converts incoming plain JSON to DTO class instances so class-validator can run
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Allow requests from the mobile app and future web client
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Backend running on http://localhost:${process.env.PORT ?? 3000}/api`);
}

bootstrap();
