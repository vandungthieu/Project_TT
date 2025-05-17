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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SensorController = void 0;
const common_1 = require("@nestjs/common");
const sensor_service_1 = require("./sensor.service");
const swagger_1 = require("@nestjs/swagger");
const create_sensor_dto_1 = require("./dto/create-sensor.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const update_sensor_dto_1 = require("./dto/update-sensor.dto");
let SensorController = class SensorController {
    sensorService;
    constructor(sensorService) {
        this.sensorService = sensorService;
    }
    createSensor(dto, req) {
        return this.sensorService.createSensor(dto, req.user);
    }
    getSensorById(id, req) {
        return this.sensorService.getSensorById(id, req.user);
    }
    getSensorByGardenId(gardenId, req) {
        return this.sensorService.getSensorByGarden(gardenId, req.user);
    }
    getByTime(gardenId, from, to, req) {
        return this.sensorService.getSensorDataByTime(from, to, gardenId, req.user);
    }
    getAverage24h(gardenId, req) {
        return this.sensorService.getAverageSensorData24h(gardenId, req.user);
    }
    updateSensor(id, dto, req) {
        return this.sensorService.updateSensor(id, dto, req.user);
    }
    deleteSensor(id, req) {
        return this.sensorService.deleteSensor(id, req.user);
    }
};
exports.SensorController = SensorController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'thêm sensor mới ' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "thêm thành công vegetable", type: create_sensor_dto_1.CreateSensorDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sensor_dto_1.CreateSensorDto, Object]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "createSensor", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'lấy sensor theo id  ' }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false, description: 'Số trang (mặc định: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false, description: 'Số bản ghi mỗi trang (mặc định: 10)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "lấy thành công", type: create_sensor_dto_1.CreateSensorDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Không tìm thấy garden" }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "getSensorById", null);
__decorate([
    (0, common_1.Get)('/garden:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'lấy sensor theo garden id  ' }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false, description: 'Số trang (mặc định: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false, description: 'Số bản ghi mỗi trang (mặc định: 10)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "lấy thành công", type: create_sensor_dto_1.CreateSensorDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Không tìm thấy garden" }),
    __param(0, (0, common_1.Param)('gardenId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "getSensorByGardenId", null);
__decorate([
    (0, common_1.Get)('garden/:gardenId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy dữ liệu cảm biến của garden theo khoảng thời gian' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Param)('gardenId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "getByTime", null);
__decorate([
    (0, common_1.Get)('garden/:gardenId/average'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy nhiệt độ và độ ẩm trung bình 24h qua' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Thành công' }),
    __param(0, (0, common_1.Param)('gardenId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "getAverage24h", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'cập nhật sensor ' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "thành công", type: create_sensor_dto_1.CreateSensorDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Không tìm thấy sensor" }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_sensor_dto_1.UpdateSensorDto, Object]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "updateSensor", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Xoá sensor ' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "thành công", type: create_sensor_dto_1.CreateSensorDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Không tìm thấy sensor" }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SensorController.prototype, "deleteSensor", null);
exports.SensorController = SensorController = __decorate([
    (0, swagger_1.ApiTags)('sensor'),
    (0, common_1.Controller)('sensors'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [sensor_service_1.SensorService])
], SensorController);
//# sourceMappingURL=sensor.controller.js.map