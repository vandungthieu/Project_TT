import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { WebsocketModule } from 'src/websocket/websocket.module';
import { MqttController } from './mqtt.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DataProcessorModule } from 'src/data/data-processor.module';

@Module({
  imports:[WebsocketModule, PrismaModule, DataProcessorModule],
  controllers: [MqttController],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}