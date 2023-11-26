import { Status } from '@prisma/client';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductsDto } from 'src/products/dto';
import { Type } from 'class-transformer';
import { Order_ItemDto } from './cart.dto';
export class UpdateCartDto {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  adresse?: string;

  @IsOptional()
  @IsString()
  ville?: string;

  @IsOptional()
  @IsString()
  codepos?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  status?: Status;

  @IsOptional()
  @IsNumber()
  totalPrice: number;

  @IsOptional()
  products?: ProductsDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Order_ItemDto)
  order_Items: Order_ItemDto[];
}
