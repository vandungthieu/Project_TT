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
exports.GardenController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const garden_service_1 = require("./garden.service");
const create_garden_dto_1 = require("./dto/create-garden.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
const ownership_guard_1 = require("../auth/guards/ownership.guard");
const update_garden_dto_1 = require("./dto/update-garden.dto");
let GardenController = class GardenController {
    gardenService;
    constructor(gardenService) {
        this.gardenService = gardenService;
    }
    getAllGarden() {
        return this.gardenService.getAllGarden();
    }
    async getGardens(req) {
        console.log('User from token:', req.user);
        const userId = req.user.id;
        return this.gardenService.getGardenByUserId(userId);
    }
    getGardenById(id, req) {
        return this.gardenService.getGardenById(id, req.user.id);
    }
    createGarden(dto, req) {
        const userId = req.user.id;
        return this.gardenService.createGarden(dto, userId);
    }
    updateGardenById(id, dto) {
        return this.gardenService.updateGardenById(id, dto);
    }
    deleteGarden(id) {
        return this.gardenService.deleteGarden(id);
    }
};
exports.GardenController = GardenController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)('admin'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'lấy tất cả garden (chỉ admin) ' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "lấy thành công garden", type: create_garden_dto_1.CreateGardenDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GardenController.prototype, "getAllGarden", null);
__decorate([
    (0, common_1.Get)('user'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy danh sách garden của user hiện tại' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lấy thành công danh sách garden', type: [create_garden_dto_1.CreateGardenDto] }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Chưa xác thực' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Không tìm thấy garden' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], GardenController.prototype, "getGardens", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'lấy garden theo Id) ' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "lấy thành công garden", type: create_garden_dto_1.CreateGardenDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Không tìm thấy user" }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], GardenController.prototype, "getGardenById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, ownership_guard_1.OwnershipGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'tạo garden mới ' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "tạo thành công garden", type: create_garden_dto_1.CreateGardenDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_garden_dto_1.CreateGardenDto, Object]),
    __metadata("design:returntype", void 0)
], GardenController.prototype, "createGarden", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, ownership_guard_1.OwnershipGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'update garden theo id) ' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "update thành công garden", type: create_garden_dto_1.CreateGardenDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Không tìm thấy garden" }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_garden_dto_1.UpdateGardenDto]),
    __metadata("design:returntype", void 0)
], GardenController.prototype, "updateGardenById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, ownership_guard_1.OwnershipGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'xóa garden theo id) ' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "xóa thành công garden" }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Không tìm thấy garden" }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], GardenController.prototype, "deleteGarden", null);
exports.GardenController = GardenController = __decorate([
    (0, swagger_1.ApiTags)('gardens'),
    (0, common_1.Controller)('gardens'),
    __metadata("design:paramtypes", [garden_service_1.GardenService])
], GardenController);
//# sourceMappingURL=garden.controller.js.map