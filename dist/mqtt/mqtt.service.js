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
exports.MqttService = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const websocket_gateway_1 = require("../websocket/websocket.gateway");
const rxjs_1 = require("rxjs");
const data_processor_1 = require("../data/data-processor");
let MqttService = class MqttService {
    websocketGateway;
    dataProcessor;
    client;
    constructor(websocketGateway, dataProcessor) {
        this.websocketGateway = websocketGateway;
        this.dataProcessor = dataProcessor;
    }
    async publish(topic, data) {
        await (0, rxjs_1.lastValueFrom)(this.client.emit(topic, data));
    }
    handleIncomingData(data) {
        const processedData = this.dataProcessor.processDataFromMqtt(data);
        return processedData;
    }
};
exports.MqttService = MqttService;
__decorate([
    (0, microservices_1.Client)({
        transport: microservices_1.Transport.MQTT,
        options: {
            url: 'mqtts://f275e90fe8454aed8c3d90e35c44fc09.s1.eu.hivemq.cloud:8883',
            username: 'dungthieu123',
            password: 'Dung.tv215547',
        },
    }),
    __metadata("design:type", microservices_1.ClientProxy)
], MqttService.prototype, "client", void 0);
exports.MqttService = MqttService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [websocket_gateway_1.WebsocketGateway,
        data_processor_1.DataProcessorService])
], MqttService);
//# sourceMappingURL=mqtt.service.js.map