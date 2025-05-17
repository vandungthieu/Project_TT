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
var DataProcessorService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataProcessorService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let DataProcessorService = DataProcessorService_1 = class DataProcessorService {
    prisma;
    jwtService;
    configService;
    logger = new common_1.Logger(DataProcessorService_1.name);
    constructor(prisma, jwtService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async processDataFromMqtt(data) {
        const { temperature, humidity, gardenId } = data;
        const stack = new Error().stack;
        const caller = stack?.split('\n')[2]?.trim() || 'Unknown caller';
        this.logger.log(`Hàm processDataFromMqtt được gọi bởi: ${caller}`);
        if (!temperature || !humidity || !gardenId) {
            this.logger.warn('Dữ liệu không hợp lệ:', data);
            return { message: 'Invalid data format', received: data };
        }
        try {
            const savedData = await this.prisma.sensorData.create({
                data: {
                    temperature,
                    humidity,
                    gardenId,
                },
            });
            this.logger.log('Dữ liệu đã được lưu:', savedData);
            return { message: 'Data processed and saved', savedData };
        }
        catch (error) {
            this.logger.error('Lỗi khi lưu dữ liệu:', error.message);
            throw new Error('Data processing error');
        }
    }
    async processDataFromWebsocket(payload) {
        const { token, gardenId, data } = payload;
        const user = await this.validateToken(token);
        const hasAccess = await this.checkGardenAccess(user.id, gardenId);
        if (!hasAccess) {
            throw new common_1.UnauthorizedException('Access denied to this garden');
        }
        console.log('Processing data from WebSocket:', data);
        const { temperature, humidity } = data;
        if (typeof temperature !== 'number' || typeof humidity !== 'number') {
            console.warn('Invalid data format:', data);
            throw new Error('Invalid data format');
        }
        const processedData = {
            gardenId,
            temperature,
            humidity,
            timestamp: new Date(),
            user,
        };
        console.log('Processed data:', processedData);
        return processedData;
    }
    async validateToken(token) {
        try {
            const secret = this.configService.get('JWT_SECRET');
            const payload = this.jwtService.verify(token, { secret });
            return payload;
        }
        catch (error) {
            console.warn('Token validation failed:', error.message);
            throw new common_1.UnauthorizedException('Invalid token');
        }
    }
    async checkGardenAccess(userId, gardenId) {
        const garden = await this.prisma.garden.findFirst({
            where: {
                id: gardenId,
                userId,
            },
        });
        return !!garden;
    }
};
exports.DataProcessorService = DataProcessorService;
exports.DataProcessorService = DataProcessorService = DataProcessorService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], DataProcessorService);
//# sourceMappingURL=data-processor.js.map