import { IsNotEmpty, IsString } from 'class-validator';

enum UserRole {
  Personal = 'Admin',
  Society = 'Society',
  Admin = 'Admin',
}
export class AuthGoogleDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;
  @IsString()
  @IsNotEmpty()
  email: string;
  passowrd: string;
  @IsString()
  @IsNotEmpty()
  accountType: UserRole;
}
