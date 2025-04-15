import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }>;
    login(req: any): {
        access_token: string;
        user: any;
    };
}
