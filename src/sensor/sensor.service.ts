import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SensorService{
    constructor (private readonly prisma: PrismaService){}

    // 
}