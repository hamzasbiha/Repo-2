import { ForbiddenException, Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { EditUserDto, UserInputDto } from './dto';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { UpdatePassword } from './dto/passwordUpdate.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

@Injectable()
@UseGuards(JwtGuard)
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly mailerservice: MailerService,
    private config :ConfigService,
  ) {}
  verifyNumber: any;
  //TODO: check the user role if admin or not to give access
  getAll() {
    return this.prisma.user.findMany();
  }

  getUser() {
    return this.prisma.user.findFirst();
  }

  //TODO: Should check if it is the current user or not by password!
  async editUser(user: User, dto: EditUserDto) {
    // Verify the provided password against the stored hashed password
    const passwordCheck = await argon.verify(user.password, dto.password);
    if (passwordCheck) {
      const newHashedPassword = await argon.hash(dto.password); // Use the new password here
      const updatedUser = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...dto,
          password: newHashedPassword,
        },
      });

      delete updatedUser.password;
      return updatedUser;
    }

    throw new ForbiddenException('Wrong password');
  }

  async updatePassword(
    user: User,
    dto: EditUserDto,
    dtoPassword: UpdatePassword,
  ) {
    const userPassword = user.password; // Get the current user's password

    const isPasswordCorrect = await argon.verify(userPassword, dto.password);

    if (!isPasswordCorrect) {
      throw new ForbiddenException('Incorrect current password');
    }

    const newHashedPassword = await argon.hash(dtoPassword.NewPassword);

    const updatedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: newHashedPassword,
      },
    });

    delete updatedUser.password;
    return updatedUser;
  }
  //TODO: Should check if it is the current user or not by password!
  async deleteUser(user: User, dto: EditUserDto) {
    const userExist = await this.prisma.user.findFirst();
    const userpassword = userExist.password;
    const PassMatch = argon.verify(userpassword, dto.password);
    if (userExist && PassMatch) {
      return this.prisma.user.delete({
        where: {
          id: user.id,
        },
      });
    }
  }
  async verifyemailuser(user: User, dto: EditUserDto) {
    const userExist = await this.prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });
    if (userExist) {
      const genCode = this.generateUniqueRandomFourDigitNumber();
      const newCliet = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...dto,
          VN: genCode,
        },
      });
      await this.mailerservice.sendMail({
        to: user.email,
        from: this.config.get("MAIL_USER"),
        subject: 'code verfication',
        text: `Click on the following link`,
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${genCode}</h2>
    <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>Your Brand Inc</p>
      <p>1600 Amphitheatre Parkway</p>
      <p>California</p>
    </div>
  </div>
</div>`,
      });
      return genCode;
    }
    throw new ForbiddenException('User Not Exsit');
  }
  async giveMeBackthenumber(
    userInput: UserInputDto,
    user: User,
    dto: EditUserDto,
  ) {
    enum Verification {
      verify = 'verify',
      NotVerified = 'NotVerified',
    }

    const getVn = await this.prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });
    if (userInput.VN === getVn.VN) {
      const updateUserVerifcation = await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...dto,
          verification: Verification.verify,
          VN: null,
        },
      });

      return updateUserVerifcation;
    }
    throw new ForbiddenException('Wrong value');
  }

  generateUniqueRandomFourDigitNumber() {
    const uniqueNumbers = new Set();

    while (uniqueNumbers.size === 0) {
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      uniqueNumbers.add(randomNumber);
    }

    return uniqueNumbers.values().next().value.toString();
  }
}
