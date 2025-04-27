import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { SensorController } from "./sensor.controller";
import { SensorService } from "./sensor.service";

@Module({
    imports: [PrismaService],
    controllers:[SensorController],
    providers:[SensorService]
})
export class SensorModule{}