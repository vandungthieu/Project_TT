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
exports.GardenService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GardenService = class GardenService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createGarden(dto, user) {
        let userId;
        if (user.role === 'admin' && dto.userId) {
            const user = await this.prisma.user.findUnique({
                where: { id: dto.userId },
            });
            if (!user) {
                throw new common_1.NotFoundException('User không tồn tại');
            }
            userId = dto.userId;
        }
        else {
            if (dto.userId && dto.userId !== user.id) {
                throw new common_1.ForbiddenException('You are not allowed to create a garden for another user');
            }
            userId = user.id;
        }
        const existingGarden = await this.prisma.garden.findFirst({
            where: { name: dto.name, userId }
        });
        if (existingGarden) {
            throw new common_1.BadRequestException('Garden name already exists for this user');
        }
        return await this.prisma.garden.create({
            data: {
                name: dto.name,
                userId
            }
        });
    }
    async getGarden(user) {
        if (user.role === 'admin') {
            return await this.prisma.garden.findMany();
        }
        else {
            return await this.prisma.garden.findMany({
                where: { userId: user.id }
            });
        }
    }
    async getGardenById(id, user) {
        const garden = await this.prisma.garden.findUnique({
            where: { id }
        });
        if (!garden) {
            throw new common_1.NotFoundException(`Not found garden: ${id}`);
        }
        if (user.role !== 'admin' && garden.userId != user.id) {
            throw new common_1.ForbiddenException("You are not authorized to access this resource");
        }
        return garden;
    }
    async updateGardenById(id, dto, user) {
        const garden = await this.prisma.garden.findUnique({ where: { id } });
        if (!garden) {
            throw new common_1.NotFoundException(`Not found garden: ${id}`);
        }
        if (user.role !== 'admin' && garden.userId !== user.id) {
            throw new common_1.ForbiddenException('You are not allowed to update this garden');
        }
        const duplicate = await this.prisma.garden.findFirst({
            where: {
                name: dto.name,
                userId: garden.userId
            }
        });
        if (duplicate) {
            throw new common_1.BadRequestException('Garden name already exists for this user');
        }
        return await this.prisma.garden.update({
            where: { id },
            data: dto
        });
    }
    async deleteGarden(id, user) {
        const garden = await this.prisma.garden.findUnique({ where: { id } });
        if (!garden) {
            throw new common_1.NotFoundException(`Not found garden: ${id}`);
        }
        if (user.role !== 'admin' && user.id !== garden.userId) {
            throw new common_1.ForbiddenException('You are not allowed to delete this garden');
        }
        return await this.prisma.garden.delete({
            where: { id },
        });
    }
};
exports.GardenService = GardenService;
exports.GardenService = GardenService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GardenService);
//# sourceMappingURL=garden.service.js.map