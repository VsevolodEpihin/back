import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function start() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const config = new DocumentBuilder()
    .setTitle('Todo')
    .setDescription('Хранение и изменение задач')
    .setVersion('1.0.0')
    .addTag('trainee developer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const config_service = app.get(ConfigService);
  SwaggerModule.setup('/api/docs', app, document);
  app.enableCors({ origin: config_service.get('ORIGIN') });
  await app.listen(config_service.get('PORT'));
}

start();
