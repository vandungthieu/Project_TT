import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { EnvCheckMiddleware } from './middleware/envCheck.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { GardenModule } from './garden/garden.module';
import { UsersModule } from './user/user.module';
import { VegetableModule } from './vegetable/vegetable.module';
import { SaleModule } from './sale/sale.module';

@Module({
  imports: [PrismaModule, AuthModule, GardenModule,UsersModule, VegetableModule, SaleModule ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer
    .apply(EnvCheckMiddleware)
    .forRoutes('*')
    .apply(LoggerMiddleware)
    .forRoutes({path:'*', method: RequestMethod.ALL})
  }
}
