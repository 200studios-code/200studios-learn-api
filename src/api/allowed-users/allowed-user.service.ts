import { AllowedUserCreateDto } from '@/api/allowed-users/dto/allowed-user-create.dto';
import { AllowedUser } from '@/api/allowed-users/models/allowed-user.model';
import { PrismaService } from '@/shared/datasource/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { GlobalRole } from '@prisma/local-client';

@Injectable()
export class AllowedUserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findByEmail(email: string): Promise<AllowedUser> {
    return this.prismaService.allowedUser.findUnique({
      where: {
        email,
      },
    });
  }

  public async create(data: AllowedUserCreateDto): Promise<AllowedUser> {
    return this.prismaService.allowedUser.create({
      data: {
        ...data,
        globalRole: GlobalRole.STUDENT,
      },
    });
  }
}
