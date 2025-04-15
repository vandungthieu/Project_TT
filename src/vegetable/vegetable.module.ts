import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { VegetableController } from "./vegetable.controller";
import { VegetableService } from "./vegetable.service";

@Module({
    imports:[PrismaModule],
    controllers:[VegetableController],
    providers:[VegetableService]
})
export class VegetableModule{}