import { PrismaService } from "src/prisma/prisma.service";
export declare class SaleService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSale(): Promise<void>;
}
