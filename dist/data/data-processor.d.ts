import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
export declare class DataProcessorService {
    private readonly prisma;
    private readonly jwtService;
    private readonly configService;
    private readonly logger;
    constructor(prisma: PrismaService, jwtService: JwtService, configService: ConfigService);
    processDataFromMqtt(data: {
        temperature: number;
        humidity: number;
        gardenId: number;
    }): Promise<{
        message: string;
        received: {
            temperature: number;
            humidity: number;
            gardenId: number;
        };
        savedData?: undefined;
    } | {
        message: string;
        savedData: {
            id: number;
            gardenId: number;
            temperature: number;
            humidity: number;
            timestamp: Date;
        };
        received?: undefined;
    }>;
    processDataFromWebsocket(payload: {
        token: string;
        gardenId: number;
        data: any;
    }): Promise<{
        gardenId: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
        user: {
            id: number;
            email: string;
            role: string;
        };
    }>;
    validateToken(token: string): Promise<{
        id: number;
        email: string;
        role: string;
    }>;
    checkGardenAccess(userId: number, gardenId: number): Promise<boolean>;
}
