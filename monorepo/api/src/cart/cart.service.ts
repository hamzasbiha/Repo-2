import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartDto } from './dto/cart.dto';
import { Prisma, User } from '@prisma/client';
import { UpdateCartDto } from './dto/updatecart.dto';
import { error } from 'console';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addtocart(user: User, dto: CartDto) {
    console.log(dto);
    const userExist = await this.prisma.user.findFirst({
      where: { id: user.id },
    });

    if (!userExist) {
      // Handle the case when the user doesn't exist
      return null; // Or throw an error, as needed
    }

    const cartExist = await this.prisma.cart.findFirst({
      where: {
        userId: userExist.id,
      },
    });

    const orderItemsData = dto.order_Items.map((item) => ({
      productId: item.productId,
      quantity_per_item: item.quantity_per_item,
    }));

    if (cartExist) {
      // Merge the existing order items with the new ones

      await this.prisma.cart.update({
        where: {
          id: cartExist.id,
        },
        data: {
          order_Items: {
            create: orderItemsData,
          },
        },
        include: {
          order_Items: true,
        },
      });
    } else {
      return this.prisma.cart.create({
        data: {
          email: dto.email,
          adresse: dto.adresse,
          ville: dto.ville,
          codepos: dto.codepos,
          phone: dto.phone,
          totalPrice: dto.totalPrice,
          userId: userExist.id,
          order_Items: {
            create: orderItemsData,
          },
        },
      });
    }
  }

  getCarts() {
    return this.prisma.cart.findMany({
      include: {
        User: true,
        order_Items: {
          include: {
            products: true,
          },
        },
      },
    });
  }
  async getOrderClient(cardId: number) {
    const cart = this.prisma.cart.findFirst({
      where: {
        id: cardId,
      },
      include: {
        User: true,
        order_Items: {
          include: {
            products: true,
          },
        },
      },
    });
    return cart;
  }
  async getCartByid(cardId: number) {
    const cart = await this.prisma.cart.findUnique({
      where: {
        id: cardId,
      },
      include: {
        User: true,
        order_Items: {
          include: {
            products: true,
          },
        },
      },
    });
    if (!cart) {
      throw new ForbiddenException('Not found');
    }
    return cart;
  }
  //get the user cart one
  async getYourCart(userId: number) {
    try {
      const cart = await this.prisma.cart.findFirstOrThrow({
        where: {
          userId: userId,
        },
        include: {
          User: true,
          order_Items: {
            include: {
              products: true,
            },
          },
        },
      });

      return cart;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return null;
      }
      throw error;
    }
  }
  async updateOrder(cartId: number, dto: UpdateCartDto) {
    console.log(dto)
    try {
      const orderExist = await this.prisma.cart.findFirst({
        where: {
          id: cartId,
        },
      });
      if (orderExist) {
        await this.prisma.cart.update({
          where: {
            id: orderExist.id,
          },
          data: {
            status: dto.status,
            totalPrice: dto.totalPrice,
            codepos: dto.codepos,
            adresse: dto.adresse,
            ville: dto.ville,
          },
        });
      }
      throw new ForbiddenException(error);
    } catch (error) {
      console.log(error.message);
    }
  }
  deletecart(cartId: number) {
    return this.prisma.cart.delete({
      where: {
        id: cartId,
      },
    });
  }
}
