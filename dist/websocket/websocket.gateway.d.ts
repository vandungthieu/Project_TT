import { Server } from 'socket.io';
import { DataProcessorService } from 'src/data/data-processor';
export declare class WebsocketGateway {
    private readonly dataProcessor;
    server: Server;
    private mqttClient;
    constructor(dataProcessor: DataProcessorService);
    afterInit(): void;
    handleConnection(client: any): void;
    handleDisconnect(client: any): void;
    handlePublishData(client: any, payload: {
        token: string;
        gardenId: number;
        data: any;
    }): Promise<void>;
}
