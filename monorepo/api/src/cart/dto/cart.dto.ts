import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Status } from '@prisma/client';
import { Type } from 'class-transformer';

export class Order_ItemDto {
  @IsNumber()
  @Type(() => Order_ItemDto)
  productId: number;
  @Type(() => Order_ItemDto)
  @IsNumber()
  quantity_per_item: number;
}
export class CartDto {
  @IsNotEmpty()
  @IsString()
  email: string;

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
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsNumber()
  userId?: number;
  @IsNumber()
  totalPrice: number;

  @ValidateNested({ each: true })
  @Type(() => Order_ItemDto)
  order_Items: Order_ItemDto[];

}
