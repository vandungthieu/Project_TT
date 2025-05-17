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
exports.SensorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SensorService = class SensorService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSensor(dto, user) {
        const garden = await this.prisma.garden.findUnique({
            where: { id: dto.gardenId }
        });
        if (!garden) {
            throw new common_1.NotFoundException(`Garden with id ${dto.gardenId} not found`);
        }
        if (user.role !== 'admin' && garden.userId !== user.id) {
            throw new common_1.ForbiddenException('You are not authorized to create a sensor in this garden');
        }
        return await this.prisma.sensorData.create({
            data: dto
        });
    }
    async getSensorById(id, user) {
        const sensor = await this.prisma.sensorData.findUnique({
            where: { id }
        });
        if (!sensor) {
            throw new common_1.NotFoundException('sensor not found');
        }
        const garden = await this.prisma.garden.findUnique({
            where: { id: sensor.gardenId }
        });
        if (!garden) {
            throw new common_1.NotFoundException(`Not found garden`);
        }
        if (user.role !== 'admin' && user.id !== garden.userId) {
            throw new common_1.ForbiddenException('You are not authorized to get sensor in this garden');
        }
        return sensor;
    }
    async getSensor(user) {
        if (user.role === 'admin') {
            return await this.prisma.sensorData.findMany();
        }
        const userId = user.id;
        const sensor = await this.prisma.sensorData.findMany({
            where: {
                garden: {
                    userId
                }
            }
        });
        if (!sensor || sensor.length === 0) {
            throw new common_1.NotFoundException(`Không tìm thấy sensor nào cho userId: ${userId}`);
        }
        return sensor;
    }
    async getSensorDataByTime(from, to, gardenId, user) {
        const garden = await this.prisma.garden.findUnique({
            where: { id: gardenId },
        });
        if (!garden) {
            throw new common_1.NotFoundException(`Garden with id ${gardenId} not found`);
        }
        if (user.role !== 'admin' && garden.userId !== user.id) {
            throw new common_1.ForbiddenException('You are not authorized to access this garden\'s sensor data');
        }
        const fromDate = new Date(from);
        const toDate = new Date(to);
        if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
            throw new common_1.BadRequestException('Invalid date format');
        }
        const sensorData = await this.prisma.sensorData.findMany({
            where: {
                gardenId,
                timestamp: {
                    gte: fromDate,
                    lte: toDate,
                },
            },
            orderBy: {
                timestamp: 'asc',
            },
        });
        return sensorData;
    }
    async getAverageSensorData24h(gardenId, user) {
        const garden = await this.prisma.garden.findUnique({
            where: { id: gardenId },
        });
        if (!garden) {
            throw new common_1.NotFoundException(`Garden with id ${gardenId} not found`);
        }
        if (user.role !== 'admin' && garden.userId !== user.id) {
            throw new common_1.ForbiddenException('You are not authorized to access this garden\'s sensor data');
        }
        const toDate = new Date();
        const fromDate = new Date(toDate.getTime() - 24 * 60 * 60 * 1000);
        const data = await this.prisma.sensorData.findMany({
            where: {
                gardenId,
                timestamp: {
                    gte: fromDate,
                    lte: toDate,
                },
            },
        });
        if (data.length === 0) {
            throw new common_1.NotFoundException('No sensor data found for the last 24 hours');
        }
        const avgTemp = data.reduce((sum, d) => sum + d.temperature, 0) / data.length;
        const avgHumidity = data.reduce((sum, d) => sum + d.humidity, 0) / data.length;
        return {
            gardenId,
            averageTemperature: avgTemp.toFixed(2),
            averageHumidity: avgHumidity.toFixed(2),
            totalRecords: data.length,
            from: fromDate,
            to: toDate,
        };
    }
    async getSensorByGarden(gardenId, user) {
        const garden = await this.prisma.garden.findUnique({
            where: { id: gardenId }
        });
        if (!garden) {
            throw new common_1.NotFoundException('not found garden');
        }
        if (user.role !== 'admin' && garden.userId !== user.id) {
            throw new common_1.ForbiddenException('You are not authorized to get sensor in this garden');
        }
        return await this.prisma.sensorData.findMany({
            where: { gardenId }
        });
    }
    async updateSensor(id, dto, user) {
        const sensor = await this.prisma.sensorData.findUnique({
            where: { id }
        });
        if (!sensor) {
            throw new common_1.NotFoundException('sensor not found');
        }
        const garden = await this.prisma.garden.findUnique({
            where: { id: sensor.gardenId }
        });
        if (!garden) {
            throw new common_1.NotFoundException(`Not found garden`);
        }
        if (user.role !== 'admin' && user.id !== garden.userId) {
            throw new common_1.ForbiddenException('You are not authorized to get sensor in this garden');
        }
        return await this.prisma.sensorData.update({
            where: { id },
            data: dto
        });
    }
    async deleteSensor(id, user) {
        const sensor = await this.prisma.sensorData.findUnique({
            where: { id }
        });
        if (!sensor) {
            throw new common_1.NotFoundException('sensor not found');
        }
        const garden = await this.prisma.garden.findUnique({
            where: { id: sensor.gardenId }
        });
        if (!garden) {
            throw new common_1.NotFoundException(`Not found garden`);
        }
        if (user.role !== 'admin' && user.id !== garden.userId) {
            throw new common_1.ForbiddenException('You are not authorized to get sensor in this garden');
        }
        return await this.prisma.sensorData.delete({
            where: { id }
        });
    }
};
exports.SensorService = SensorService;
exports.SensorService = SensorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SensorService);
//# sourceMappingURL=sensor.service.js.map