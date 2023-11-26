import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy';
import { JwtModule, JwtModuleOptions, JwtService } from '@nestjs/jwt';
import { JwtGuard } from './guard';
import { SeassionSerialzatier } from './strategy/Serializater';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService,
      ): Promise<JwtModuleOptions> => ({
        secret: configService.get<string>('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    SeassionSerialzatier,
    JwtService,
    JwtStrategy,
    JwtGuard,
  ],
})
export class AuthModule {}
