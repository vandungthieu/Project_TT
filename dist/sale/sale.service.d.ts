import { PrismaService } from "src/prisma/prisma.service";
import { CreateSaleDto } from "./dto/create-sale.dto";
export declare class SaleService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSale(dto: CreateSaleDto, user: any): Promise<{
        id: number;
        quantity: number;
        totalPrice: number;
        soldAt: Date;
        gardenId: number;
        vegetableId: number;
    }>;
    getRevenue(user: any): Promise<{
        totalRevenue: number;
        numberOfSales: number;
        sales: {
            id: number;
            quantity: number;
            totalPrice: number;
            soldAt: Date;
            gardenId: number;
            vegetableId: number;
        }[];
    }>;
    getRevenueByGarden(gardenId: number, user: any): Promise<{
        gardenId: number;
        totalRevenue: number;
        numberOfSales: number;
    }>;
    getRevenueList(unit: 'day' | 'week' | 'month', user: any, from?: string, to?: string): Promise<{
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
