import { Injectable } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { WebsocketGateway } from '../websocket/websocket.gateway';
import { lastValueFrom } from 'rxjs';
import { DataProcessorService } from 'src/data/data-processor';

@Injectable()
export class MqttService {
  @Client({
    transport: Transport.MQTT,
    options: {
      url: 'mqtts://f275e90fe8454aed8c3d90e35c44fc09.s1.eu.hivemq.cloud:8883',
      username: 'dungthieu123',
      password: 'Dung.tv215547',
    },
  })
  private client: ClientProxy;

  constructor(
    private readonly websocketGateway: WebsocketGateway,
    private readonly dataProcessor: DataProcessorService,
  ) {}

  async publish(topic: string, data: any): Promise<void> {
    await lastValueFrom( this.client.emit(topic, data))
  }

  handleIncomingData(data: any): any {
    const processedData = this.dataProcessor.processDataFromMqtt(data);
    //this.websocketGateway.sendDataToClients(processedData);
    return processedData;
  }
}