import { PrismaService } from "src/prisma/prisma.service";
import { CreateVegetabletDto } from "./dto/create-vegetable.dto";
import { UpdateVegetableDto } from "./dto/update-vegetable.dto";
export declare class VegetableService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createVegetable(dto: CreateVegetabletDto, user: any): Promise<{
        id: number;
        name: string;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
        gardenId: number;
    }>;
    getAllVegetable(user: any): Promise<{
        id: number;
        name: string;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
        gardenId: number;
    }[]>;
    getVegetableByUser(userId: number): Promise<{
        id: number;
        name: string;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
        gardenId: number;
    }[]>;
    getVegetable(gardenId: number, user: any): Promise<{
        id: number;
        name: string;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
        gardenId: number;
    }[]>;
    updateVegetable(id: number, dto: UpdateVegetableDto): Promise<{
        id: number;
        name: string;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
        gardenId: number;
    }>;
    createPrice(id: number, dto: UpdateVegetableDto): Promise<{
        id: number;
        name: string;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
        gardenId: number;
    }>;
    updatePrice(id: number, dto: UpdateVegetableDto): Promise<{
        id: number;
        name: string;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
        gardenId: number;
    }>;
    getPrice(id: number): Promise<number | null>;
    deletePrice(id: number): Promise<{
        id: number;
        name: string;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
        gardenId: number;
    }>;
}
