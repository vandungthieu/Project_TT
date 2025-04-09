import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGardenDto } from "./dto/create-garden.dto";

@Injectable()
export class GardenService{
    constructor (private readonly prisma : PrismaService){}

    // create garden
    async createGarden(dto: CreateGardenDto){
        return await this.prisma.garden.create({
            data: dto
        })
    }

    // get all garden 
    async getAllGarden(){
        return await this.prisma.garden.findMany()
    }
}