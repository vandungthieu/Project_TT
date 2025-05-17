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
exports.WebsocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const microservices_1 = require("@nestjs/microservices");
const data_processor_1 = require("../data/data-processor");
let WebsocketGateway = class WebsocketGateway {
    dataProcessor;
    server;
    mqttClient;
    constructor(dataProcessor) {
        this.dataProcessor = dataProcessor;
    }
    afterInit() {
        console.log('WebSocket Gateway initialized');
    }
    handleConnection(client) {
        console.log('Client connected:', client.id);
    }
    handleDisconnect(client) {
        console.log('Client disconnected:', client.id);
    }
    async handlePublishData(client, payload) {
        try {
            console.log('Received data from client:', payload);
            const processedData = await this.dataProcessor.processDataFromWebsocket(payload);
            await this.mqttClient.emit('websocket/data', processedData);
            client.emit('response', { message: 'Data published to MQTT', data: processedData });
        }
        catch (error) {
            console.error('Error in handlePublishData:', error.message);
            client.emit('error', { message: error.message });
        }
    }
};
exports.WebsocketGateway = WebsocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], WebsocketGateway.prototype, "server", void 0);
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
], WebsocketGateway.prototype, "mqttClient", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('publishData'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WebsocketGateway.prototype, "handlePublishData", null);
exports.WebsocketGateway = WebsocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: { origin: '*' } }),
    __metadata("design:paramtypes", [data_processor_1.DataProcessorService])
], WebsocketGateway);
//# sourceMappingURL=websocket.gateway.js.map