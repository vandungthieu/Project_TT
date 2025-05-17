import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //cấu hình swagger
  const config = new DocumentBuilder()
  .setTitle("Garden-Management-API")
  .setDescription('API quản lý vườn')
  .setVersion('1.0')
  .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api-docs', app, document)
  
  // Tạo microservice với cấu hình MQTT
  app.connectMicroservice({
    transport: Transport.MQTT,
    options: {
      url: 'mqtts://f275e90fe8454aed8c3d90e35c44fc09.s1.eu.hivemq.cloud:8883',
      username: 'dungthieu123',
      password: 'Dung.tv215547',
    },
  });

  // Khởi động ứng dụng
  console.log('Starting microservices...');
  await app.startAllMicroservices();
  console.log('Microservices started');

  console.log('Starting HTTP server...');
  console.log('Application is running on: http://localhost:3000');
  
  await app.listen(process.env.PORT ?? 3000);
  console.log('Server running at http://localhost:3000/api-docs')
}

bootstrap().catch(err => {
  console.error('Application bootstrap failed:', err);
  process.exit(1);
});
