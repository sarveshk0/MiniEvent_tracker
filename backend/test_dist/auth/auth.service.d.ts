import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/auth.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    register(data: RegisterDto): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(userId: number): Promise<void>;
    refresh(userId: number, rt: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    updateRtHash(userId: number, rt: string): Promise<void>;
    getTokens(userId: number, email: string, role: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
