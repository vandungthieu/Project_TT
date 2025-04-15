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
    async postVegetable(dto) {
        if (dto.quantityIn < dto.quantityOut) {
            throw new common_1.BadRequestException('Số lượng bán không được lớn hớn số lượng nhập');
        }
        return await this.prisma.vegetable.create({
            data: dto
        });
    }
    async getAllVegetable() {
        return await this.prisma.vegetable.findMany();
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
    async getVegetable(gardenId) {
        const vegetable = await this.prisma.vegetable.findMany({
            where: { gardenId }
        });
        if (!vegetable) {
            throw new common_1.NotFoundException(`Not found garden: ${gardenId}`);
        }
        return await this.prisma.vegetable.findMany({
            where: { gardenId }
        });
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