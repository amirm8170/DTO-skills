import { Users } from './users.entity';
import { Repository } from 'typeorm';

export class UserRepository extends Repository<Users> {}
