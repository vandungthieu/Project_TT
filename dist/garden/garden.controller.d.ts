import { GardenService } from "./garden.service";
import { CreateGardenDto } from "./dto/create-garden.dto";
import { UpdateGardenDto } from "./dto/update-garden.dto";
export declare class GardenController {
    private readonly gardenService;
    constructor(gardenService: GardenService);
    getAllGarden(): Promise<{
        id: number;
        name: string;
        userId: number;
    }[]>;
    getGardens(req: any): Promise<{
        id: number;
        name: string;
        userId: number;
    }[]>;
    getGardenById(id: number, req: any): Promise<{
        id: number;
        name: string;
        userId: number;
    }>;
    createGarden(dto: CreateGardenDto, req: any): Promise<{
        id: number;
        name: string;
        userId: number;
    }>;
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
