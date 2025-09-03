import { AllowedUserService } from '@/api/allowed-users/allowed-user.service';
import { AllowedUserCreateDto } from '@/api/allowed-users/dto/allowed-user-create.dto';
import { AllowedUser } from '@/api/allowed-users/models/allowed-user.model';
import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Headers,
  NotFoundException,
  Post,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller('allowed-users')
export class AllowedUserController {
  constructor(
    private readonly configService: ConfigService,
    private readonly allowedUserService: AllowedUserService,
  ) {}

  @Get()
  public async allowedUserByEmail(
    @Query('email') email: string,
  ): Promise<AllowedUser> {
    const response = await this.allowedUserService.findByEmail(email);

    if (!response) {
      throw new NotFoundException();
    }

    return response;
  }

  @Post('create')
  public async create(
    @Headers() headers: Record<string, unknown>,
    @Body() data: AllowedUserCreateDto,
  ): Promise<AllowedUser> {
    if (
      headers['x-secret-key'] !==
      this.configService.get('ALLOWED_USER_SECRET_KEY')
    ) {
      throw new ForbiddenException();
    }

    return this.allowedUserService.create(data);
  }
}
