import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsPublished } from '@prisma/client'; // Adjust the path

export class ProductsDto {
  @IsOptional()
  @IsNumber()
  id: number;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsNotEmpty()
  content: string;
  @IsString()
  @IsNotEmpty()
  category: string;
  @IsString()
  market: string;
  @IsString()
  typefood: string;
  @IsString()
  quantity: string;
  @IsNumber()
  stock: number;
  @IsNotEmpty()
  images: string[];
  @IsString()
  @IsNotEmpty()
  priceForPersonal: string;
  @IsString()
  @IsNotEmpty()
  priceForCompany: string;
  @IsEnum(IsPublished)
  @IsOptional()
  published: IsPublished;
  @IsOptional()
  orderInfoId: number;
}
