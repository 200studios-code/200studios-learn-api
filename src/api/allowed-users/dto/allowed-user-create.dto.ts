import { IsEmail } from 'class-validator';

export class AllowedUserCreateDto {
  @IsEmail()
  email: string;
}
