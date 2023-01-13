import { AuthCredentialsDto } from './DTO/credentials.dto';
import { Users } from './users.entity';
import { UserRepository } from './users-repository.entity';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private UserRepository: UserRepository,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    const newUser = this.UserRepository.create({
      username,
      password,
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
}
