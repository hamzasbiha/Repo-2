import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditProductsDto, ProductsDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async getProducts(
    filter: {
      category?: string;
      title?: string;
      market: string;
      qunatite: string;
    },
    limit: number,
  ) {
    const categoryFilter = filter?.category
      ? filter.category.charAt(0).toUpperCase() +
        filter.category.slice(1).toLowerCase()
      : '';

    const titleFilter = filter?.title
      ? filter.title.charAt(0).toUpperCase() +
        filter.title.slice(1).toLowerCase()
      : '';

    let query = this.prisma.product.findMany({
      where: {
        category: {
          contains: categoryFilter,
        },
        title: {
          contains: titleFilter,
        },
        quantity: {
          contains: filter.qunatite,
        },
        market: {
          contains: filter.market,
        },
      },
    });

    // Apply the limit after awaiting the query
    const products = await query;

    if (limit) {
      return products.slice(0, limit);
    }

    return products;
  }

  getProductByid(productId: number) {
    return this.prisma.product.findFirst({
      where: {
        id: productId,
      },
    });
  }

  async createProduct(dto: ProductsDto) {
    const product = await this.prisma.product.create({
      data: {
        ...dto,
      },
    });
    return product;
  }

  editProduct(productId: number, dto: EditProductsDto) {
    //get the product
    const product = this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) throw new ForbiddenException('Acces to resource denid ');
    return this.prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteProduct(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product) {
      // Custom error message for "Not Found"
      throw new Error('Product not found');
    }

    await this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
}
