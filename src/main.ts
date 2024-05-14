import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT || 5432;
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Todo')
    .setDescription('Хранение и изменение задач')
    .setVersion('1.0.0')
    .addTag('trainee developer')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  app.enableCors({ origin: true });
  await app.listen(3000, () =>
    console.log(` server started on port = ${PORT} `),
  );
}

start();
