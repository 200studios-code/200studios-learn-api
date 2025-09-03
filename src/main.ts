import { BigIntInterceptor } from '@/shared/interceptors/big-int.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new BigIntInterceptor());

  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
