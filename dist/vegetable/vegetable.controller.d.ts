import { VegetableService } from "./vegetable.service";
import { CreateVegetabletDto } from "./dto/create-vegetable.dto";
import { UpdateVegetableDto } from "./dto/update-vegetable.dto";
export declare class VegetableController {
    private readonly vegetableService;
    constructor(vegetableService: VegetableService);
    createVegetable(dto: CreateVegetabletDto, req: any): Promise<{
        name: string;
        id: number;
        gardenId: number;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
    }>;
    getAllVegetable(req: any): Promise<{
        name: string;
        id: number;
        gardenId: number;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
    }[]>;
    getVegetableById(id: number, req: any): Promise<{
        name: string;
        id: number;
        gardenId: number;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
    }>;
    getVegetable(gardeId: number, req: any): Promise<{
        name: string;
        id: number;
        gardenId: number;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
    }[]>;
    updateVegetable(id: number, dto: UpdateVegetableDto, req: any): Promise<{
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
    deletePrice(id: number): Promise<{
        name: string;
        id: number;
        gardenId: number;
        quantityIn: number;
        quantityOut: number;
        price: number | null;
    }>;
    getPrice(id: number): Promise<number | null>;
}
