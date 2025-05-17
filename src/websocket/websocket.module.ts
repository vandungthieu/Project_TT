import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';
import { DataProcessorModule } from 'src/data/data-processor.module';

@Module({
  imports:[PrismaModule, DataProcessorModule],
  providers: [WebsocketGateway],
  exports: [WebsocketGateway],
})
export class WebsocketModule {}