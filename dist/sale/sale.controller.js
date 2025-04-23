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
exports.SaleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const sale_service_1 = require("./sale.service");
const create_sale_dto_1 = require("./dto/create-sale.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let SaleController = class SaleController {
    saleService;
    constructor(saleService) {
        this.saleService = saleService;
    }
    createSale(dto, req) {
        return this.saleService.createSale(dto, req.user);
    }
    getSaleByGarden(gardenId, req) {
        return this.saleService.getRevenueByGarden(gardenId, req.user);
    }
    getSale(req) {
        return this.saleService.getRevenue(req.user);
    }
    getTotalRevenue(unit, from, to, req) {
        return this.saleService.getRevenueList(unit, req.user, from, to);
    }
};
exports.SaleController = SaleController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'thêm sale mới ' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "thêm thành công sale", type: create_sale_dto_1.CreateSaleDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sale_dto_1.CreateSaleDto, Object]),
    __metadata("design:returntype", void 0)
], SaleController.prototype, "createSale", null);
__decorate([
    (0, common_1.Get)('garden/:gardenId'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'lấy doanh thu theo khu vườn' }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false, description: 'Số trang (mặc định: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false, description: 'Số bản ghi mỗi trang (mặc định: 10)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "lấy thành công doanh thu", type: create_sale_dto_1.CreateSaleDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    __param(0, (0, common_1.Param)('gardenId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SaleController.prototype, "getSaleByGarden", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'lấy doanh thu theo người dùng' }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false, description: 'Số trang (mặc định: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false, description: 'Số bản ghi mỗi trang (mặc định: 10)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "lấy thành công doanh thu", type: create_sale_dto_1.CreateSaleDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SaleController.prototype, "getSale", null);
__decorate([
    (0, common_1.Get)('all/price'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'lấy doanh thu theo thời gian' }),
    (0, swagger_1.ApiQuery)({ name: 'page', type: Number, required: false, description: 'Số trang (mặc định: 1)' }),
    (0, swagger_1.ApiQuery)({ name: 'limit', type: Number, required: false, description: 'Số bản ghi mỗi trang (mặc định: 10)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "lấy thành công doanh thu", type: create_sale_dto_1.CreateSaleDto }),
    (0, swagger_1.ApiResponse)({ status: 401, description: "chưa xác thực" }),
    (0, swagger_1.ApiResponse)({ status: 403, description: "Không có quyền truy cập" }),
    __param(0, (0, common_1.Query)('unit')),
    __param(1, (0, common_1.Query)('from')),
    __param(2, (0, common_1.Query)('to')),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", void 0)
], SaleController.prototype, "getTotalRevenue", null);
exports.SaleController = SaleController = __decorate([
    (0, swagger_1.ApiTags)('sales'),
    (0, common_1.Controller)('sales'),
    __metadata("design:paramtypes", [sale_service_1.SaleService])
], SaleController);
//# sourceMappingURL=sale.controller.js.map