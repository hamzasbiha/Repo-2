import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsEnum,
  IsOptional,
} from 'class-validator';

enum UserRole {
  Personal = 'Personal',
  Society = 'Society',
  Admin = 'Admin',
}

export class AuthDto {
  @IsString()
  @IsOptional()
  fullname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  phonenumber: string;

  @IsEnum(UserRole)
  @IsOptional()
  accountType?: UserRole;
}
