import { Module } from "@nestjs/common";
import { GardenService } from "./garden.service";
import { GardenController } from "./garden.controller";
import { PrismaModule } from "src/prisma/prisma.module";

@Module({
    imports:[PrismaModule],
    providers:[GardenService],
    controllers:[GardenController]
})
export class GardenModule{}