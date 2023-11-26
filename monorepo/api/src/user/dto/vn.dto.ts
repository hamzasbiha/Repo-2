import { IsString, IsOptional } from 'class-validator';

export class UserInputDto {
  @IsString()
  @IsOptional()
  VN: string;
}
