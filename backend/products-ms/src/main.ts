import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { environments } from './settings/environments/environments';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger: Logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(morgan('dev'));
  const config = new DocumentBuilder()
    .setTitle('Products Microservice API')
    .setBasePath('api')
    .setDescription('API - Clean Architecture with NestJS & TypeScript')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    customSiteTitle: 'API Documentation',
    customCssUrl:
      'https://mariosalazar-styles-swagger-ui.vercel.app/css/swagger-ui.css',
  });
  await app.listen(4002);
  logger.log(
    `This API is running on: http://127.0.0.1:${4002}`,
  );
  const microservices = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: environments.serverPort,
    },
  });
  await microservices.listen();
  logger.log(
    `This microservice is running on port: ${environments.serverPort}`,
  );

}
bootstrap();
