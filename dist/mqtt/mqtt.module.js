"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MqttModule = void 0;
const common_1 = require("@nestjs/common");
const mqtt_service_1 = require("./mqtt.service");
const websocket_module_1 = require("../websocket/websocket.module");
const mqtt_controller_1 = require("./mqtt.controller");
const prisma_module_1 = require("../prisma/prisma.module");
const data_processor_module_1 = require("../data/data-processor.module");
let MqttModule = class MqttModule {
};
exports.MqttModule = MqttModule;
exports.MqttModule = MqttModule = __decorate([
    (0, common_1.Module)({
        imports: [websocket_module_1.WebsocketModule, prisma_module_1.PrismaModule, data_processor_module_1.DataProcessorModule],
        controllers: [mqtt_controller_1.MqttController],
        providers: [mqtt_service_1.MqttService],
        exports: [mqtt_service_1.MqttService],
    })
], MqttModule);
//# sourceMappingURL=mqtt.module.js.map