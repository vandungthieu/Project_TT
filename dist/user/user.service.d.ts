import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllUser(): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    getUserById(id: number): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }>;
    updateUser(id: number, dto: UpdateUserDto): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }>;
    deleteUser(id: number): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }>;
    createAdmin(dto: CreateUserDto): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }>;
    updateUserRole(identifier: {
        id: number;
    } | {
        email: string;
    }): Promise<{
        email: string;
        name: string;
        password: string;
        id: number;
        role: import(".prisma/client").$Enums.Role;
    }>;
    getPass(): Promise<void>;
}
