import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { TokenPayload } from '../interfaces/token-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      // Specify cookie jwt
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => 
          request?.cookies?.Authentication || request?.Authentication
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  // Whatever we return from this validate method still gets populated on the request object
  async validate({ userId }: TokenPayload) {
    return this.usersService.getUser({ _id: userId });
  }
}
