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
exports.VegetableController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const vegetable_service_1 = require("./vegetable.service");
const create_vegetable_dto_1 = require("./dto/create-vegetable.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const ownership_guard_1 = require("../auth/guards/ownership.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const update_vegetable_dto_1 = require("./dto/update-vegetable.dto");
let VegetableController = class VegetableController {
    vegetableService;
    constructor(vegetableService) {
        this.vegetableService = vegetableService;
    }
    postVegetable(dto) {
        return this.vegetableService.postVegetable(dto);
    }
    getAllVegetable() {
        return this.vegetableService.getAllVegetable();
    }
    getVegetableByUserId(usedId) {
        return this.vegetableService.getVegetableByUser(usedId);
    }
    getVegetable(gardeId) {
        return this.vegetableService.getVegetable(gardeId);
    }
    updateVegetable(id, dto) {
        return this.vegetableService.updateVegetable(id, dto);
    }
    createPrice(id, dto) {
        return this.vegetableService.createPrice(id, dto);
    }
    deletePrice(id) {
        return this.vegetableService.deletePrice(id);
    }
    getPrice(id) {
        return this.vegetableService.getPrice(id);
    }
};
exports.VegetableController = VegetableController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, ownership_guard_1.OwnershipGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'thêm vegetable mới ' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "thêm thành công vegetable", type: create_vegetable_dto_1.CreateVegetabletDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vegetable_dto_1.CreateVegetabletDto]),
    __metadata("design:returntype", void 0)
], VegetableController.prototype, "postVegetable", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'lấy tất cả vegetable (chỉ admin) ' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "lấy thành công vegetable", type: create_vegetable_dto_1.CreateVegetabletDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VegetableController.prototype, "getAllVegetable", null);
__decorate([
    (0, common_1.Get)('user:userId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, ownership_guard_1.OwnershipGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'lấy vegetable theo userId ' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "lấy thành công", type: create_vegetable_dto_1.CreateVegetabletDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Không tìm thấy userId" }),
    __param(0, (0, common_1.Param)('userId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VegetableController.prototype, "getVegetableByUserId", null);
__decorate([
    (0, common_1.Get)(':gardenId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, ownership_guard_1.OwnershipGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'lấy vegetable theo garden id  ' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "lấy thành công", type: create_vegetable_dto_1.CreateVegetabletDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Không tìm thấy garden" }),
    __param(0, (0, common_1.Param)('gardenId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VegetableController.prototype, "getVegetable", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, ownership_guard_1.OwnershipGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'cập nhật vegetable ' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "thành công", type: create_vegetable_dto_1.CreateVegetabletDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Không tìm thấy vegetable" }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_vegetable_dto_1.UpdateVegetableDto]),
    __metadata("design:returntype", void 0)
], VegetableController.prototype, "updateVegetable", null);
__decorate([
    (0, common_1.Put)(':id/price'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, ownership_guard_1.OwnershipGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'cập nhật vegetable price ' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "thành công", type: create_vegetable_dto_1.CreateVegetabletDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Không tìm thấy vegetable" }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_vegetable_dto_1.UpdateVegetableDto]),
    __metadata("design:returntype", void 0)
], VegetableController.prototype, "createPrice", null);
__decorate([
    (0, common_1.Delete)(':id/price'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, ownership_guard_1.OwnershipGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'xóa vegetable price ' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "thành công" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Không tìm thấy vegetable" }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VegetableController.prototype, "deletePrice", null);
__decorate([
    (0, common_1.Get)(':id/price'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, ownership_guard_1.OwnershipGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'lấy vegetable price ' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "thành công" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Không tìm thấy vegetable" }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], VegetableController.prototype, "getPrice", null);
exports.VegetableController = VegetableController = __decorate([
    (0, swagger_1.ApiTags)('vegetables'),
    (0, common_1.Controller)('vegetables'),
    __metadata("design:paramtypes", [vegetable_service_1.VegetableService])
], VegetableController);
//# sourceMappingURL=vegetable.controller.js.map