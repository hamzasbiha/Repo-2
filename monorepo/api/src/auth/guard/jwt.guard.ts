import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {
  constructor(private jwtservice: JwtService) {
    super();
  }

}
