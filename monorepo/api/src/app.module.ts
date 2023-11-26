import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { JwtService } from '@nestjs/jwt';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailService } from './mail/mail.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // Change after hosting
          auth: {
            user: 'testunique66@gmail.com',
            pass: 'qgck ycvp puxd kvdq',
          },
        },
        defaults: {
          from: 'testunique66@gmail.com',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    UserModule,
    ProductsModule,
    PrismaModule,
    CartModule,
  ],
  controllers: [ProductsController, CartController],
  providers: [
    JwtService,
    CartService,
    ProductsService,
    MailService
  ],
})
export class AppModule {}
