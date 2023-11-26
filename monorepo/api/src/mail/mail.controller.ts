import { Controller, Get, Injectable } from '@nestjs/common';

@Injectable()
@Controller('mail')
export class MailController {

    @Get()
    sendMail(): string {
        return 'Hello World!';
    }
}
