import { PrismaService } from "src/prisma/prisma.service";
import { CreateGardenDto } from "./dto/create-garden.dto";
import { UpdateGardenDto } from "./dto/update-garden.dto";
export declare class GardenService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createGarden(dto: CreateGardenDto, userId: number): Promise<{
        id: number;
        name: string;
        userId: number;
    }>;
    getAllGarden(): Promise<{
        id: number;
        name: string;
        userId: number;
    }[]>;
    getGardenById(id: number): Promise<{
        id: number;
        name: string;
        userId: number;
    }>;
    getGardenByUserId(userId: number): Promise<{
        id: number;
        name: string;
        userId: number;
    }[]>;
    updateGardenById(id: number, dto: UpdateGardenDto): Promise<{
        id: number;
        name: string;
        userId: number;
    }>;
    deleteGarden(id: number): Promise<{
        id: number;
        name: string;
        userId: number;
    }>;
}
