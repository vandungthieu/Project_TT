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
exports.MqttController = void 0;
const common_1 = require("@nestjs/common");
const mqtt_service_1 = require("./mqtt.service");
const microservices_1 = require("@nestjs/microservices");
let MqttController = class MqttController {
    mqttService;
    constructor(mqttService) {
        this.mqttService = mqttService;
    }
    handleSensorData(data) {
        return this.mqttService.handleIncomingData(data);
    }
};
exports.MqttController = MqttController;
__decorate([
    (0, microservices_1.MessagePattern)('sensor/data'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MqttController.prototype, "handleSensorData", null);
exports.MqttController = MqttController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [mqtt_service_1.MqttService])
], MqttController);
//# sourceMappingURL=mqtt.controller.js.map