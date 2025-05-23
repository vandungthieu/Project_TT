import { PrismaService } from "src/prisma/prisma.service";
import { CreateVegetabletDto } from "./dto/create-vegetable.dto";
import { UpdateVegetableDto } from "./dto/update-vegetable.dto";
export declare class VegetableService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createVegetable(dto: CreateVegetabletDto, user: any): Promise<{
        name: string;
        id: number;
        gardenId: number;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
    }>;
    getAllVegetable(user: any): Promise<{
        name: string;
        id: number;
        gardenId: number;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
    }[]>;
    getVegetableById(id: number, user: any): Promise<{
        name: string;
        id: number;
        gardenId: number;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
    }>;
    getVegetableByUser(userId: number): Promise<{
        name: string;
        id: number;
        gardenId: number;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
    }[]>;
    getVegetable(gardenId: number, user: any): Promise<{
        name: string;
        id: number;
        gardenId: number;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
    }[]>;
    updateVegetable(id: number, dto: UpdateVegetableDto): Promise<{
        name: string;
        id: number;
        gardenId: number;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
    }>;
    createPrice(id: number, dto: UpdateVegetableDto): Promise<{
        name: string;
        id: number;
        gardenId: number;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
    }>;
    updatePrice(id: number, dto: UpdateVegetableDto): Promise<{
        name: string;
        id: number;
        gardenId: number;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
    }>;
    getPrice(id: number): Promise<number | null>;
    deletePrice(id: number): Promise<{
        name: string;
        id: number;
        gardenId: number;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
    }>;
}
