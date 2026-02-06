import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, res: Response): Promise<{
        message: string;
    }>;
    register(registerDto: RegisterDto, res: Response): Promise<{
        message: string;
    }>;
    logout(req: any, res: Response): Promise<{
        message: string;
    }>;
    refresh(req: any, res: Response): Promise<{
        message: string;
    }>;
    me(req: any): Promise<any>;
    private setCookies;
}
