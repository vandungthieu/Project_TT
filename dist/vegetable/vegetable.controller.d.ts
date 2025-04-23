import { VegetableService } from "./vegetable.service";
import { CreateVegetabletDto } from "./dto/create-vegetable.dto";
import { UpdateVegetableDto } from "./dto/update-vegetable.dto";
export declare class VegetableController {
    private readonly vegetableService;
    constructor(vegetableService: VegetableService);
    createVegetable(dto: CreateVegetabletDto, req: any): Promise<{
        id: number;
        name: string;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
        gardenId: number;
    }>;
    getAllVegetable(req: any): Promise<{
        id: number;
        name: string;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
        gardenId: number;
    }[]>;
    getVegetableById(id: number, req: any): Promise<{
        id: number;
        name: string;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
        gardenId: number;
    }>;
    getVegetable(gardeId: number, req: any): Promise<{
        id: number;
        name: string;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
        gardenId: number;
    }[]>;
    updateVegetable(id: number, dto: UpdateVegetableDto, req: any): Promise<{
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
    deletePrice(id: number): Promise<{
        id: number;
        name: string;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
        gardenId: number;
    }>;
    getPrice(id: number): Promise<number | null>;
}
