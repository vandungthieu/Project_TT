"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataProcessorModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../prisma/prisma.module");
const data_processor_1 = require("./data-processor");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let DataProcessorModule = class DataProcessorModule {
};
exports.DataProcessorModule = DataProcessorModule;
exports.DataProcessorModule = DataProcessorModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, config_1.ConfigModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET'),
                    signOptions: { expiresIn: '12h' },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [data_processor_1.DataProcessorService],
        exports: [data_processor_1.DataProcessorService]
    })
], DataProcessorModule);
//# sourceMappingURL=data-processor.module.js.map