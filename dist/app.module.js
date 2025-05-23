"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("./prisma/prisma.module");
const envCheck_middleware_1 = require("./middleware/envCheck.middleware");
const logger_middleware_1 = require("./middleware/logger.middleware");
const auth_module_1 = require("./auth/auth.module");
const garden_module_1 = require("./garden/garden.module");
const user_module_1 = require("./user/user.module");
const vegetable_module_1 = require("./vegetable/vegetable.module");
const sale_module_1 = require("./sale/sale.module");
const sensor_module_1 = require("./sensor/sensor.module");
const mqtt_module_1 = require("./mqtt/mqtt.module");
const websocket_module_1 = require("./websocket/websocket.module");
const data_processor_module_1 = require("./data/data-processor.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(envCheck_middleware_1.EnvCheckMiddleware)
            .forRoutes('*')
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, auth_module_1.AuthModule, garden_module_1.GardenModule, user_module_1.UsersModule, vegetable_module_1.VegetableModule, sale_module_1.SaleModule, sensor_module_1.SensorModule, mqtt_module_1.MqttModule, websocket_module_1.WebsocketModule, data_processor_module_1.DataProcessorModule],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map