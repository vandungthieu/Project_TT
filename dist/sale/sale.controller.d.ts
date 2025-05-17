import { SaleService } from "./sale.service";
import { CreateSaleDto } from "./dto/create-sale.dto";
export declare class SaleController {
    private readonly saleService;
    constructor(saleService: SaleService);
    createSale(dto: CreateSaleDto, req: any): Promise<{
        id: number;
        gardenId: number;
        vegetableId: number;
        quantity: number;
        totalPrice: number;
        soldAt: Date;
    }>;
    getSaleByGarden(gardenId: number, req: any): Promise<{
        gardenId: number;
        totalRevenue: number;
        numberOfSales: number;
    }>;
    getSale(req: any): Promise<{
        totalRevenue: number;
        numberOfSales: number;
        sales: {
            id: number;
            gardenId: number;
            vegetableId: number;
            quantity: number;
            totalPrice: number;
            soldAt: Date;
        }[];
    }>;
    getTotalRevenue(unit: 'day' | 'week' | 'month', from: string, to: string, req: any): Promise<{
        unit: "day" | "week" | "month";
        from: string | null;
        to: string | null;
        totalRevenue: number;
        data: {
            time: string;
            revenue: number;
        }[];
    }>;
}
