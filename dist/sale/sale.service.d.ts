import { PrismaService } from "src/prisma/prisma.service";
import { CreateSaleDto } from "./dto/create-sale.dto";
export declare class SaleService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSale(dto: CreateSaleDto, user: any): Promise<{
        id: number;
        gardenId: number;
        vegetableId: number;
        quantity: number;
        totalPrice: number;
        soldAt: Date;
    }>;
    getRevenue(user: any): Promise<{
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
