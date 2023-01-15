import { AuthCredentialsDto } from './DTO/credentials.dto';
import { UserRepository } from './users-repository.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private UserRepository;
    private jwtService;
    constructor(UserRepository: UserRepository, jwtService: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
