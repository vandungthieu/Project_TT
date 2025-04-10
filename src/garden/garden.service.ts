import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGardenDto } from "./dto/create-garden.dto";
import { UpdateGardenDto } from "./dto/update-garden.dto";

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

    //get garden by id
    async getGardenById(id: number){
        return await this.prisma.garden.findUniqueAndThrow({
            where: {id}
        })
    }

    //get garden by userId
    async getGardenByUserId(userId: number){
        const gardens = await this.prisma.garden.findMany({
            where:{userId: userId}
        })
        if(!gardens){
            throw new NotFoundException(`Not found userId:${userId}`)
        }
        return gardens
    }

    //update garden 
    async updateGardenById(id: number, dto: UpdateGardenDto){
        const garden = await this.prisma.garden.findUnique({where:{id}})
        if(!garden){
            throw new NotFoundException(`Not found garden: ${id}`)
        }
        return await this.prisma.garden.update({
            where: {id},
            data: dto
        })
    }

    // delete garden 
    async deleteGarden(id: number){
        const garden = await this.prisma.garden.findUnique({where:{id}})
        if(!garden){
            throw new NotFoundException(`Not found garden: ${id}`)
        }
        return await this.prisma.garden.delete({
            where: {id},
        })
    }
}