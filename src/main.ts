import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envConfig } from './config/envs';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(server)
  );

  // Configuraciones existentes
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.setGlobalPrefix('api');

  const port = envConfig.PORT || 3000;
  await app.init();

  if (process.env.VERCEL) {
    // Exportación para Vercel
    return server;
  } else {
    // Modo desarrollo normal
    server.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
    return app;
  }
}

// Exportación condicional para Vercel
if (process.env.VERCEL) {
  module.exports = bootstrap();
} else {
  bootstrap();
}