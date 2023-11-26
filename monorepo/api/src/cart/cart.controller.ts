import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartDto } from './dto/cart.dto';
import { JwtGuard } from 'src/auth/guard';
import { GetUser, HasRoles } from 'src/auth/decorator';
import { User, UserRole } from '@prisma/client';
import { request } from 'express';
import { UpdateCartDto } from './dto/updatecart.dto';

@Controller('cart')
export class CartController {
  constructor(private cartservice: CartService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  addtoCart(@GetUser() user: User, @Body() dto: CartDto) {
    return this.cartservice.addtocart(user, dto);
  }
  @UseGuards(JwtGuard)
  @HasRoles(UserRole.Admin)
  @Get('carts')
  getCarts() {
    return this.cartservice.getCarts();
  }
  @UseGuards(JwtGuard)
  @HasRoles(UserRole.Admin)
  @Get('order/:id')
  getOrderClient(@Param('id', ParseIntPipe) id: number) {
    return this.cartservice.getOrderClient(id);
  }
  @UseGuards(JwtGuard)
  @Get('carts/:id')
  getCartByid(@Param('id', ParseIntPipe) id: number) {
    return this.cartservice.getCartByid(id);
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  getyourcart(@Param('id', ParseIntPipe) id: number) {
    return this.cartservice.getYourCart(id);
  }
  @UseGuards(JwtGuard)
  @HasRoles(UserRole.Admin)
  @Patch('update/:id')
  updateCart(@Param('id',ParseIntPipe) orderId : number,@Body() dto : UpdateCartDto){
    return this.cartservice.updateOrder(orderId,dto)
  }
  @HasRoles(UserRole.Admin)
  @Delete(':id')
  deletecart(@Param('id', ParseIntPipe) cartId: number) {
    return this.cartservice.deletecart(cartId);
  }
}
