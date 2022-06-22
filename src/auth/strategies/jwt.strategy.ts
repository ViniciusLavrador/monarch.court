import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigInterface } from 'src/config';
import { User } from 'src/auth/entities/user.entity';
import { JwtService } from 'src/auth/services/jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(ConfigService) private readonly configService: ConfigService<ConfigInterface>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET', { infer: true }),
      ignoreExpiration: false,
    });
  }

  private validate(token: User): Promise<User | never> {
    return this.jwtService.validateUser(token);
  }
}
