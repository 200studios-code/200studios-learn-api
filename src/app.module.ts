import { validate } from '@/shared/config/env.validation';
import { PrismaService } from '@/shared/datasource/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
    }),
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
