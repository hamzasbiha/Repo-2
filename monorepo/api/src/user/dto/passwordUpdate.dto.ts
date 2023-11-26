import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdatePassword {
  @IsOptional()
  NewPassword: string;
}
