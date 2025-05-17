import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { DataProcessorService } from 'src/data/data-processor';

@WebSocketGateway({ cors: { origin: '*' } })
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  @Client({
    transport: Transport.MQTT,
    options: {
      url: 'mqtts://f275e90fe8454aed8c3d90e35c44fc09.s1.eu.hivemq.cloud:8883',
      username: 'dungthieu123',
      password: 'Dung.tv215547',
    },
  })
  private mqttClient: ClientProxy;

  constructor(
    private readonly dataProcessor: DataProcessorService,
  ) {}

  afterInit() {
    console.log('WebSocket Gateway initialized');
  }

  handleConnection(client: any) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('publishData')
  async handlePublishData(client: any, payload: { token: string; gardenId: number; data: any }) {
    try {
    console.log('Received data from client:', payload);

    // Xử lý và xác thực dữ liệu
    const processedData = await this.dataProcessor.processDataFromWebsocket(payload);

    // Gửi dữ liệu lên MQTT
    await this.mqttClient.emit('websocket/data', processedData);

    // Phản hồi cho client WebSocket đã gửi dữ liệu
    client.emit('response', { message: 'Data published to MQTT', data: processedData });

    } catch (error) {
    console.error('Error in handlePublishData:', error.message);
    client.emit('error', { message: error.message });
    }
  }

}