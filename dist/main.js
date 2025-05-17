"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle("Garden-Management-API")
        .setDescription('API quản lý vườn')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api-docs', app, document);
    app.connectMicroservice({
        transport: microservices_1.Transport.MQTT,
        options: {
            url: 'mqtts://f275e90fe8454aed8c3d90e35c44fc09.s1.eu.hivemq.cloud:8883',
            username: 'dungthieu123',
            password: 'Dung.tv215547',
        },
    });
    console.log('Starting microservices...');
    await app.startAllMicroservices();
    console.log('Microservices started');
    console.log('Starting HTTP server...');
    console.log('Application is running on: http://localhost:3000');
    await app.listen(process.env.PORT ?? 3000);
    console.log('Server running at http://localhost:3000/api-docs');
}
bootstrap().catch(err => {
    console.error('Application bootstrap failed:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map