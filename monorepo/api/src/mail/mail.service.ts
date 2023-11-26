import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EditUserDto } from 'src/user/dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private config: ConfigService,
  ) {}

  async sendUserConfirmation(user: EditUserDto, token: string) {
    const url = `http://localhost:3006/auth/confirm?token=${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      from: this.config.get('MAIL_USER'), 
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './transactional', 
      context: {
        name: user.fullname,
        url,
      },
    });
  }
}
