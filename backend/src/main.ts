import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // API Versioning
  app.setGlobalPrefix('api/v1');

  // Global Interceptors & Filters
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.use(cookieParser());
  
  // Necessary for Secure cookies to work on Render
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.set('trust proxy', 1);

  app.enableCors({
    origin: (origin, callback) => {
      // Reflect the origin to allow any domain (localhost, IP, or production URL)
      // This is necessary for credentials (cookies) to work across different origins
      callback(null, true);
    },
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Mini Event Tracker API')
    .setDescription('Standardized API with Users and Events management')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('events')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
