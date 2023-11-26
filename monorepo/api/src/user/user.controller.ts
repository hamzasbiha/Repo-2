import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { User, UserRole } from '@prisma/client';
import { GetUser } from '../auth/decorator/getuser.decortaor';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto/edituser.dto';
import { UserService } from './user.service';
import { RoleGuard } from './guard';
import { HasRoles } from '../auth//decorator/roles.decorator';
import { UpdatePassword } from './dto/passwordUpdate.dto';
import { dot } from 'node:test/reporters';
import { UserInputDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('user')
  @UseGuards(JwtGuard)
  @HasRoles(UserRole.Admin, UserRole.Personal, UserRole.Society)
  async getUser(@GetUser() user: User) {
    return user;
  }

  @Get('users')
  @UseGuards(RoleGuard)
  @HasRoles(UserRole.Admin)
  async getAllUser() {
    return this.userService.getAll();
  }

  @UseGuards(JwtGuard)
  @Patch()
  async editUser(@GetUser() user: User, @Body() dto: EditUserDto) {
    return this.userService.editUser(user, dto);
  }
  @UseGuards(JwtGuard)
  @Patch('update-password')
  async updaetPassword(
    @GetUser() user: User,
    @Body() dto: EditUserDto,
    @Body() dtoPassword: UpdatePassword,
  ) {
    return this.userService.updatePassword(user, dto, dtoPassword);
  }

  @UseGuards(JwtGuard)
  @Delete('delete-account')
  async deleteUser(@GetUser() user: User, @Body() dto: EditUserDto) {
    return this.userService.deleteUser(user, dto);
  }
  @Get('verfication')
  @UseGuards(JwtGuard)
  verifyEmail(@GetUser() user: User, dto: EditUserDto) {
    return this.userService.verifyemailuser(user, dto);
  }

  @Post('verify-you-accounte')
  @UseGuards(JwtGuard)
  giveitBack(
    @GetUser() user: User,
    @Body() userInput: UserInputDto,
    dto: EditUserDto,
  ) {
    return this.userService.giveMeBackthenumber(userInput, user, dto);
  }
}
