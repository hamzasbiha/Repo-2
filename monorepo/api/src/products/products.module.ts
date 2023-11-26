import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { JwtService } from '@nestjs/jwt';
import { RoleGuard } from '../user/guard/role.guard';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, JwtService, RoleGuard],
})
export class ProductsModule {}
