import { BigIntInterceptor } from '@/shared/interceptors/big-int.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import supertokens from 'supertokens-node';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new BigIntInterceptor());

  app.enableCors({
    origin: [
      config.get('FRONTEND_DOMAIN'),
      config.get('ORDER_TRACKING_DOMAIN'),
    ],
    allowedHeaders: [
      'content-type',
      'apollo-require-preflight',
      ...supertokens.getAllCORSHeaders(),
    ],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
