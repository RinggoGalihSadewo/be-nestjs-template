import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import 'dotenv/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as packageJSON from '../package.json';
import { join } from 'path';
import * as express from 'express';

const port = process.env.PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({ origin: true, exposedHeaders: ['*'] });
  app.useGlobalPipes(new ValidationPipe());

  if (process.env.SWAGGER_DOCS_PATH) {
    const config = new DocumentBuilder()
      .setTitle(packageJSON.name)
      .setDescription('API Documentation')
      .setVersion(packageJSON.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(process.env.SWAGGER_DOCS_PATH, app, document);
  }

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  await app.listen(port);
  Logger.log(`Listening on http://localhost:${port}`);
}
bootstrap();
