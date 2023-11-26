import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { IsPublished } from '@prisma/client';

export class EditProductsDto {
  @IsString()
  title?: string;
  @IsString()
  @IsOptional()
  content?: string;
  @IsString()
  @IsOptional()
  category?: string;
  @IsString()
  typefood: string;
  @IsString()
  market: string;
  @IsString()
  quantity: string;
  @IsNumber()
  stock?: number;
  @IsOptional()
  images?: string[];
  @IsString()
  @IsOptional()
  priceForPersonal: string;
  @IsString()
  @IsOptional()
  priceForCompany: string;
  @IsEnum(IsPublished)
  @IsOptional()
  published: IsPublished;
  @IsOptional()
  orderInfoId: number;
}
