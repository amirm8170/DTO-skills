import { Users } from './users.entity';
import { JwtPayload } from './jwt-payload.interface';
import { UserRepository } from './users-repository.entity';
import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: UserRepository);
    validate(payload: JwtPayload): Promise<Users>;
}
export {};
