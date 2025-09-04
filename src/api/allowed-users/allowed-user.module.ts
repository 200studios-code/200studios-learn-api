import { AllowedUserController } from '@/api/allowed-users/allowed-user.controller';
import { AllowedUserService } from '@/api/allowed-users/allowed-user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AllowedUserController],
  providers: [AllowedUserService],
})
export class AllowedUserModule {}
