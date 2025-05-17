import { Controller } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @MessagePattern('sensor/data')
  handleSensorData(data: any) {
    return this.mqttService.handleIncomingData(data);
  }
}