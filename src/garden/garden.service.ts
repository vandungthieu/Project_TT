import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGardenDto } from "./dto/create-garden.dto";
import { UpdateGardenDto } from "./dto/update-garden.dto";

@Injectable()
export class GardenService{
    constructor (private readonly prisma : PrismaService){}

    // create garden
    async createGarden(dto: CreateGardenDto, userId: number){
       // kiểm tra tên trùng lặp
       const existingGarden = await this.prisma.garden.findFirst({
        where:{name: dto.name,userId}
       })
       if (existingGarden) {
        throw new BadRequestException('Garden name already exists for this user');
      }

      try {
        return await this.prisma.garden.create({
          data: {
            name: dto.name,
            userId // Liên kết với user
          },
        });
      } catch (error) {
        throw new BadRequestException('Failed to create garden');
      }
    }

    // get all garden 
    async getAllGarden(){
        return await this.prisma.garden.findMany()
    }

    //get garden by id
    async getGardenById(id: number, userIdToken: number){
        const garden = await this.prisma.garden.findUnique({
            where: {id}
        })
        if(!garden){
            throw new NotFoundException(`Not found garden: ${id}`)
        }else if(garden.userId != userIdToken){
            throw new ForbiddenException("You are not authorized to access this resource")
        }
        return garden
    }

    //get garden by userId
    async getGardenByUserId(userId: number){
        const gardens = await this.prisma.garden.findMany({
            where:{userId}
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