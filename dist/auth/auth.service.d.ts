import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }>;
    validateUser(email: string, password: string): Promise<{
        email: string;
        name: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }>;
    createToken(user: any): {
        access_token: string;
        user: any;
    };
}
