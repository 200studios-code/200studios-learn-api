import { AuthGuard } from '@/shared/auth/auth.guard';
import { Session } from '@/shared/decorators/session.decorator';
import { SessionWithMetadata } from '@/shared/types';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { getUserMetadata } from 'supertokens-node/recipe/usermetadata';

@Controller('auth')
export class AuthController {
  constructor() {}

  @UseGuards(AuthGuard)
  @Get('/user')
  public async getUser(@Session() session: SessionWithMetadata) {
    const userMetadata = await getUserMetadata(session.getUserId());

    return userMetadata.metadata;
  }
}
