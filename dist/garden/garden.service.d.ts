import { PrismaService } from "src/prisma/prisma.service";
import { CreateGardenDto } from "./dto/create-garden.dto";
import { UpdateGardenDto } from "./dto/update-garden.dto";
export declare class GardenService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createGarden(dto: CreateGardenDto, user: any): Promise<{
        name: string;
        id: number;
        userId: number;
    }>;
    getGarden(user: any): Promise<{
        name: string;
        id: number;
        userId: number;
    }[]>;
    getGardenById(id: number, user: any): Promise<{
        name: string;
        id: number;
        userId: number;
    }>;
    updateGardenById(id: number, dto: UpdateGardenDto, user: any): Promise<{
        name: string;
        id: number;
        userId: number;
    }>;
    deleteGarden(id: number, user: any): Promise<{
        name: string;
        id: number;
        userId: number;
    }>;
}
