import { WebsocketGateway } from '../websocket/websocket.gateway';
import { DataProcessorService } from 'src/data/data-processor';
export declare class MqttService {
    private readonly websocketGateway;
    private readonly dataProcessor;
    private client;
    constructor(websocketGateway: WebsocketGateway, dataProcessor: DataProcessorService);
    publish(topic: string, data: any): Promise<void>;
    handleIncomingData(data: any): any;
}
