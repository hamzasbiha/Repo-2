import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';

enum UserRole {
  Personal = 'Admin',
  Society = 'Society',
  Admin = 'Admin',
}
enum Verification {
  verify = 'verify',
  NotVerified = 'NotVerified',
}

export class UserDto {
  @IsString()
  @IsOptional()
  fullname?: string;
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsOptional()
  password: string;
  @IsString()
  @IsOptional()
  phonenumber?: string;
  @IsOptional()
  @IsEnum(UserRole)
  @IsString()
  accountType?: UserRole;
  @IsOptional()
  @IsString()
  VN: Verification;
  @IsEnum(Verification)
  @IsOptional()
  verification: Verification;
}
