import { GardenService } from "./garden.service";
import { CreateGardenDto } from "./dto/create-garden.dto";
import { UpdateGardenDto } from "./dto/update-garden.dto";
export declare class GardenController {
    private readonly gardenService;
    constructor(gardenService: GardenService);
    getGardens(req: any): Promise<{
        name: string;
        id: number;
        userId: number;
    }[]>;
    getGardenById(id: number, req: any): Promise<{
        name: string;
        id: number;
        userId: number;
    }>;
    createGarden(dto: CreateGardenDto, req: any): Promise<{
        name: string;
        id: number;
        userId: number;
    }>;
    updateGardenById(id: number, dto: UpdateGardenDto, req: any): Promise<{
        name: string;
        id: number;
        userId: number;
    }>;
    deleteGarden(id: number, req: any): Promise<{
        name: string;
        id: number;
        userId: number;
    }>;
}
