import { AllowedUserModule } from '@/api/allowed-users/allowed-user.module';
import { validate } from '@/shared/config/env.validation';
import { PrismaModule } from '@/shared/datasource/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
    }),
    PrismaModule,
    AllowedUserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
