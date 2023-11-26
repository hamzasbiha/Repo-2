import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  Query,
  UseGuards,
  Patch,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthGoogleDto } from './dto';
import { EditUserDto } from 'src/user/dto';
import { JwtGuard } from './guard';
import { GetUser } from './decorator';
import { User } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  singup(@Body() dto: AuthDto) {
    return this.authService.singup(dto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  singin(@Body() dto: AuthDto) {
    return this.authService.singin(dto);
  }
  //google auth
  @Post('Google')
  GoogleSingin(@Body() dto: AuthGoogleDto) {
    return this.authService.SinginWithGoogle(dto);
  }
  @Post('forget-Password')
  forgetPassword(@Body() dto: EditUserDto) {
    return this.authService.forgetPassword(dto);
  }
  @UseGuards(JwtGuard)
  @Patch('reset-password')
  async restPassword(@GetUser() user: User, @Body() dto: EditUserDto) {
    return this.authService.restpassword(user, dto);
  }

}
