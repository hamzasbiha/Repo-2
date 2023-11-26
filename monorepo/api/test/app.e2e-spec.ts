import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as pactum from 'pactum';
import { NestApplication } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
import { EditUserDto } from 'src/user/dto';
import { ProductsDto } from 'src/products/dto';
import { UserRole } from '@prisma/client';
describe('App e2e', () => {
  let app: NestApplication;
  let prisma: PrismaService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3004);
    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3004');
  });
  afterAll(() => {
    app.close();
  });

  describe('Auth', () => {
    const dto: AuthDto = {
      firstname: 'hamza',
      lastname: 'sbiha',
      email: 'hamz1456@gmail.com',
      password: '123456',
      phonenumber: '50651248',
      // accountType: UserRole.ADMIN,
    };
    describe('signup', () => {
      it('Should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('Should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('Should throw if no body provided ', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('Should signup', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201)
          .inspect();
      });
    });
    describe('SingIn', () => {
      it('Should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('Should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('Should throw if no body provided ', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
      it('Should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'accesToken');
      });
    });
  });
  describe('Users', () => {
    describe('GetUser', () => {
      it('should get current User', () => {
        return pactum
          .spec()
          .get('/users/user')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .stores('userId', 'id')
          .inspect();
      });
    });
    describe('GetAllUser', () => {
      it('should get All the User', () => {
        return pactum
          .spec()
          .get('/users/All')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200)
          .inspect();
      });
    });
    describe('EditUser', () => {
      it('should edit  User', () => {
        const dto: EditUserDto = {
          firstname: 'hamzanew',
          lastname: 'sbihanew',
          email: 'hamza123456@gmail.com',
          password: '123456',
          phonenumber: '25918407',
          // accountType: UserRole.ADMIN,
        };
        return pactum
          .spec()
          .patch('/users/')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .expectStatus(200)
          .inspect();
      });
    });
    // describe('DeleteUser', () => {
    //   const dto = it('Should delete user', () => {
    //     return pactum
    //       .spec()
    //       .delete('/users/{id}')
    //       .withPathParams('id', '$S{userId}')
    //       .withHeaders({ Authorization: 'Bearer $S{userAt}' })
    //       .inspect();
    //   });
    // });
  });

  describe('Product', () => {
    describe('Get Products', () => {
      it('Should get products', () => {
        return pactum
          .spec()
          .get('/products')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200);
      });
    });
    describe('CreateProduct', () => {
      const dto: ProductsDto = {
        title: 'myfirstProduct',
        content: 'new content',
        category: 'Chien',
        quantity: 4,
        availability: true,
        mainimg:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-5-zFuJrEpCAb6GBo_0sectextImpADWK0BJUKavm&s',
        images: [
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-5-zFuJrEpCAb6GBo_0sectextImpADWK0BJUKavm&s',
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-5-zFuJrEpCAb6GBo_0sectextImpADWK0BJUKavm&s',
        ],
        priceForCompany: '18dt',
        priceForPersonal: '24dt',
      };
      it('Should create product', () => {
        return pactum
          .spec()
          .post('/products')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .withBody(dto)
          .stores('productId', 'id')
          .expectStatus(201);
      });
    });
    describe('GetProductById', () => {
      it('Should get product by id', () => {
        return pactum
          .spec()
          .get('/products/{id}')
          .withPathParams('id', '$S{productId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200);
      });
    });
    describe('EditProduct', () => {
      const dto: ProductsDto = {
        title: 'new title',
        content: 'new describtion',
        category: 'chat',
        quantity: 2,
        availability: true,
        mainimg: 'ojpeozape',
        images: ['ojpeozape', 'ojpeozape'],
        priceForCompany: '21dt',
        priceForPersonal: '26dt',
      };
      it('Should edit product by id', () => {
        return pactum
          .spec()
          .patch('/products/{id}')
          .withPathParams('id', '$S{productId}')
          .withBody(dto)
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200);
      });
    });
    describe('DeleteProduct', () => {
      it('Should delete product id', () => {
        return pactum
          .spec()
          .delete('/products/{id}')
          .withPathParams('id', '$S{productId}')
          .withHeaders({ Authorization: 'Bearer $S{userAt}' })
          .expectStatus(200);
      });
    });
  });
});
