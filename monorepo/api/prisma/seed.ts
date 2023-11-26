import { PrismaClient } from '@prisma/client';
import { data } from './data';

const prisma = new PrismaClient();

async function main() {
  try {
    for (const productData of data) {
      await prisma.product.create({
        data: {
          title: productData.title,
          content: productData.content,
          category: productData.category,
          market: productData.market,
          typefood: productData.typefood,
          quantity: productData.quantity,
          images: productData.images,
          stock: productData.stock,
          priceForCompany: productData.priceForCompany,
          priceForPersonal: productData.priceForPersonal,
        },
      });
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
