import {
  Controller,
  UseGuards,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { EditProductsDto, ProductsDto } from './dto';
import { HasRoles } from '../auth/decorator/roles.decorator';
import { RoleGuard } from '../user/guard/role.guard';
import { UserRole } from '@prisma/client';
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getProducts(
    @Query('category') category: string,
    @Query('title') title: string,
    @Query('market') market: string,
    @Query('qunatite') qunatite: string,
    @Query('limit') limit: number, // Add a limit query parameter
  ) {
    const filter = { category, title, market, qunatite };
    const products = await this.productsService.getProducts(filter, limit);
    return products;
  }

  //client acces or visteur
  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getProductByid(@Param('id', ParseIntPipe) productsId: number) {
    return this.productsService.getProductByid(productsId);
  }

  //admin acces

  @HttpCode(HttpStatus.CREATED)
  @Post('create')
  @UseGuards(RoleGuard)
  @HasRoles(UserRole.Admin)
  createProduct(@Body() dto: ProductsDto) {
    return this.productsService.createProduct(dto);
  }

  //admin acces

  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  @UseGuards(RoleGuard)
  @HasRoles(UserRole.Admin)
  editProduct(
    @Param('id', ParseIntPipe) productId: number,
    @Body() dto: EditProductsDto,
  ) {
    return this.productsService.editProduct(productId, dto);
  }

  //admin acces
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  @UseGuards(RoleGuard)
  @HasRoles(UserRole.Admin)
  deleteProduct(@Param('id', ParseIntPipe) productId: number) {
    return this.productsService.deleteProduct(productId);
  }
}
