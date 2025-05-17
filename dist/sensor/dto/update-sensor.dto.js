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
exports.UpdateSensorDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateSensorDto {
    temperature;
    humidity;
    timestamp;
}
exports.UpdateSensorDto = UpdateSensorDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nhiệt độ đo được', example: 26.5 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateSensorDto.prototype, "temperature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Độ ẩm đo được', example: 70.2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateSensorDto.prototype, "humidity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Thời gian đo (ISO8601)', example: '2025-04-23T14:00:00Z' }),
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateSensorDto.prototype, "timestamp", void 0);
//# sourceMappingURL=update-sensor.dto.js.map