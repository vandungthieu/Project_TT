import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { DataProcessorService } from "./data-processor";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [PrismaModule, ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '12h' },
      }),
      inject: [ConfigService],
    }),
    ],
    providers:[DataProcessorService],
    exports:[DataProcessorService]
})
export class DataProcessorModule{}