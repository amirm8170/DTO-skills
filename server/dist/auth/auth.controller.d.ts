import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './DTO/credentials.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCredentialsDto): Promise<{
        accessToken: string;
    }>;
}
