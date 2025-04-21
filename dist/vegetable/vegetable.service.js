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
exports.VegetableService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let VegetableService = class VegetableService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createVegetable(dto, user) {
        if (dto.quantityIn < dto.quantityOut) {
            throw new common_1.BadRequestException('Số lượng bán không được lớn hớn số lượng nhập');
        }
        const garden = await this.prisma.garden.findUnique({
            where: { id: dto.gardenId }
        });
        if (!garden) {
            throw new common_1.NotFoundException('Garden not found');
        }
        if (user.role !== 'admin' && garden.userId !== user.id) {
            throw new common_1.ForbiddenException('You are not authorized to create a vegetable in this garden');
        }
        return await this.prisma.vegetable.create({
            data: dto
        });
    }
    async getAllVegetable(user) {
        if (user.role === 'admin') {
            return await this.prisma.vegetable.findMany();
        }
        else {
            const userId = user.id;
            const vegetables = await this.prisma.vegetable.findMany({
                where: {
                    garden: {
                        userId
                    }
                }
            });
            if (!vegetables || vegetables.length === 0) {
                throw new common_1.NotFoundException(`Không tìm thấy loại rau nào cho userId: ${userId}`);
            }
            return vegetables;
        }
    }
    async getVegetableByUser(userId) {
        const vegetables = await this.prisma.vegetable.findMany({
            where: {
                garden: {
                    userId
                }
            }
        });
        if (!vegetables || vegetables.length === 0) {
            throw new common_1.NotFoundException(`Không tìm thấy loại rau nào cho userId: ${userId}`);
        }
        return vegetables;
    }
    async getVegetable(gardenId, user) {
        const garden = await this.prisma.garden.findUnique({
            where: { id: gardenId }
        });
        if (!garden) {
            throw new common_1.NotFoundException(`Not found garden: ${gardenId}`);
        }
        if (user.role !== 'admin' && user.id !== garden.userId) {
            throw new common_1.ForbiddenException('You are not authorized to get vegetables in this garden');
        }
        const vegetable = await this.prisma.vegetable.findMany({
            where: { gardenId }
        });
        if (vegetable.length === 0) {
            throw new common_1.NotFoundException(`No vegetables found in garden ${gardenId}`);
        }
        return vegetable;
    }
    async updateVegetable(id, dto) {
        const vegetable = await this.prisma.vegetable.findUnique({
            where: { id }
        });
        if (!vegetable) {
            throw new common_1.NotFoundException(`Not found vegetable: ${id}`);
        }
        return await this.prisma.vegetable.update({
            where: { id },
            data: dto
        });
    }
    async createPrice(id, dto) {
        const vegetable = await this.prisma.vegetable.findUnique({
            where: { id }
        });
        if (!vegetable) {
            throw new common_1.NotFoundException(`Not found vegetable: ${id}`);
        }
        return await this.prisma.vegetable.update({
            where: { id },
            data: dto
        });
    }
    async updatePrice(id, dto) {
        const vegetable = await this.prisma.vegetable.findUnique({
            where: { id }
        });
        if (!vegetable) {
            throw new common_1.NotFoundException(`Not found vegetable: ${id}`);
        }
        return await this.prisma.vegetable.update({
            where: { id },
            data: dto
        });
    }
    async getPrice(id) {
        const vegetable = await this.prisma.vegetable.findUnique({
            where: { id }
        });
        if (!vegetable) {
            throw new common_1.NotFoundException(`Not found vegetable: ${id}`);
        }
        return vegetable.price;
    }
    async deletePrice(id) {
        const vegetable = await this.prisma.vegetable.findUnique({
            where: { id }
        });
        if (!vegetable) {
            throw new common_1.NotFoundException(`Not found vegetable id: ${id}`);
        }
        return await this.prisma.vegetable.update({
            where: { id },
            data: {
                price: null
            }
        });
    }
};
exports.VegetableService = VegetableService;
exports.VegetableService = VegetableService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VegetableService);
//# sourceMappingURL=vegetable.service.js.map