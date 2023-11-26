import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RoleGuard } from './guard';
import { JwtService } from '@nestjs/jwt';
import { UserResovler } from './user.resolver';
import { ConfigService } from '@nestjs/config';

// import { AuthModule } from '../auth/auth.module';

@Module({
  // imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, JwtService, RoleGuard,UserResovler,ConfigService],
})
export class UserModule {}
