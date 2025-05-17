import { MqttService } from './mqtt.service';
export declare class MqttController {
    private readonly mqttService;
    constructor(mqttService: MqttService);
    handleSensorData(data: any): any;
}
