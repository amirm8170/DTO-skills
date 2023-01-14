import { JwtPayload } from './jwt-payload.interface';
import { AuthCredentialsDto } from './DTO/credentials.dto';
import { Users } from './users.entity';
import { UserRepository } from './users-repository.entity';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private UserRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = this.UserRepository.create({
      username,
      password: hashPassword,
    });
    try {
      await this.UserRepository.save(newUser);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username is already exist!');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;

    const user = await this.UserRepository.findOneBy({ username });
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);

    if (user && (await bcrypt.compare(password, user.password))) {
      return { accessToken };
    } else {
      throw new UnauthorizedException('invalid login credentials.');
    }
  }
}
