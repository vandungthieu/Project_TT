import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
  
  await app.listen(process.env.PORT ?? 3000);
  console.log('Server running at http://localhost:3000/api-docs')
}
bootstrap();
