import { Users } from './users.entity';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './users-repository.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'secretKey',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: JwtPayload): Promise<Users> {
    const { username } = payload;
    const user: Users = await this.userRepository.findOneBy({ username });

    if (!user) {
      throw new UnauthorizedException();
    } else {
      return user;
    }
  }
}
