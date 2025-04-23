"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SaleService = class SaleService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSale(dto, user) {
        const vegetable = await this.prisma.vegetable.findUnique({
            where: { id: dto.vegetableId },
        });
        if (!vegetable) {
            throw new common_1.NotFoundException(`Vegetable not found with ID ${dto.vegetableId}`);
        }
        const garden = await this.prisma.garden.findUnique({
            where: { id: vegetable.gardenId }
        });
        if (!garden) {
            throw new common_1.NotFoundException(`Garden not found`);
        }
        if (user.role !== 'admin' && user.id !== garden.userId) {
            throw new common_1.ForbiddenException('You are not authorized to create a sale for this vegetable');
        }
        const availableQuantity = vegetable.quantityIn - vegetable.quantityOut;
        if (dto.quantity > availableQuantity) {
            throw new common_1.BadRequestException('Quantity sold exceeds available stock');
        }
        await this.prisma.vegetable.update({
            where: { id: dto.vegetableId },
            data: {
                quantityOut: vegetable.quantityOut + dto.quantity
            }
        });
        return await this.prisma.sale.create({
            data: {
                gardenId: garden.id,
                vegetableId: dto.vegetableId,
                quantity: dto.quantity,
                totalPrice: dto.totalPrice,
                soldAt: new Date(dto.soldAt),
            }
        });
    }
    async getRevenue(user) {
        const sales = await this.prisma.sale.findMany({
            where: {
                ...(user.role !== 'admin' && {
                    garden: {
                        userId: user.id
                    }
                })
            },
        });
        const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
        return {
            totalRevenue,
            numberOfSales: sales.length,
            sales,
        };
    }
    async getRevenueByGarden(gardenId, user) {
        const garden = await this.prisma.garden.findUnique({
            where: { id: gardenId }
        });
        if (!garden) {
            throw new common_1.NotFoundException(`Garden ${gardenId} not found`);
        }
        if (user.role !== 'admin' && garden.userId !== user.id) {
            throw new common_1.ForbiddenException('You are not authorized to view this garden\'s revenue');
        }
        const sales = await this.prisma.sale.findMany({
            where: { gardenId }
        });
        const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);
        return {
            gardenId,
            totalRevenue,
            numberOfSales: sales.length
        };
    }
    async getRevenueList(unit, user, from, to) {
        const whereCondition = {};
        if (user.role !== 'admin') {
            whereCondition.garden = { userId: user.id };
        }
        if (from || to) {
            whereCondition.time = {};
            if (from)
                whereCondition.time.gte = new Date(from);
            if (to)
                whereCondition.time.lte = new Date(to);
        }
        const sales = await this.prisma.sale.findMany({
            where: whereCondition,
            include: {
                garden: true
            }
        });
        const groupKey = (date) => {
            const d = new Date(date);
            if (unit === 'day')
                return d.toISOString().slice(0, 10);
            if (unit === 'week') {
                const firstDayOfWeek = new Date(d.setDate(d.getDate() - d.getDay()));
                return firstDayOfWeek.toISOString().slice(0, 10);
            }
            if (unit === 'month')
                return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;
            throw new Error(`Invalid unit: ${unit}`);
        };
        const revenueMap = {};
        for (const sale of sales) {
            const key = groupKey(sale.soldAt);
            revenueMap[key] = (revenueMap[key] || 0) + sale.totalPrice;
        }
        const data = Object.entries(revenueMap).map(([time, revenue]) => ({
            time, revenue
        }));
        const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
        return {
            unit,
            from: from || null,
            to: to || null,
            totalRevenue,
            data
        };
    }
};
exports.SaleService = SaleService;
exports.SaleService = SaleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SaleService);
//# sourceMappingURL=sale.service.js.map