import { JwtService } from '@nestjs/jwt';
import { PassportSerializer } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SeassionSerialzatier extends PassportSerializer {
  constructor(
    private jwtService: JwtService,
    private configservice: ConfigService,
  ) {
    super();
  }

  serializeUser(user: any) {
    const payload = {
      sub: user.id, // User ID or unique identifier
      email: user.email,
      accountType: 'Personal',
      // other user-related data
    };

    const token = this.jwtService.sign(payload, {
      secret: this.configservice.get('SEASSIONSECRET'),
    });
    return token;
  }

  deserializeUser(payload: any) {
    const user = this.jwtService.verify(payload);
    return user;
  }
}
