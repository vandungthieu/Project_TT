import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGardenDto } from "./dto/create-garden.dto";
import { UpdateGardenDto } from "./dto/update-garden.dto";

@Injectable()
export class GardenService{
    constructor (private readonly prisma : PrismaService){}

    // create garden
    async createGarden(dto: CreateGardenDto, user: any){
        let userId: any

        //nếu là admin và truyền vào userId thì cho phép
        if(user.role === 'admin' && dto.userId){
            const user = await this.prisma.user.findUnique({
                where: { id: dto.userId },
              });
              if (!user) {
                throw new NotFoundException('User không tồn tại');
              }

            userId = dto.userId
        } 
        else{
            if(dto.userId && dto.userId !== user.id){
                throw new ForbiddenException('You are not allowed to create a garden for another user');
            }

            userId = user.id
        }

       // kiểm tra tên trùng lặp
        const existingGarden = await this.prisma.garden.findFirst({
            where:{name: dto.name, userId}
        })
        if (existingGarden) {
            throw new BadRequestException('Garden name already exists for this user');
        }

        return await this.prisma.garden.create({
            data:{
                name: dto.name,
                userId
            }
        })
    }

    //get garden by userId
    async getGarden(user: any){
        if(user.role === 'admin'){
            return await this.prisma.garden.findMany()
        } else{
            return await this.prisma.garden.findMany({
                where:{userId: user.id}
            })
        }
    }

    //get garden by id
    async getGardenById(id: number, user: any){
        const garden = await this.prisma.garden.findUnique({
            where: {id}
        })
        if(!garden){
            throw new NotFoundException(`Not found garden: ${id}`)
        }
        
        if(user.role !== 'admin' && garden.userId != user.id){
            throw new ForbiddenException("You are not authorized to access this resource")
        }
        return garden
    }

    //update garden 
    async updateGardenById(id: number, dto: UpdateGardenDto, user: any ){
        const garden = await this.prisma.garden.findUnique({where:{id}})
        if(!garden){
            throw new NotFoundException(`Not found garden: ${id}`)
        }

        // Chỉ cho admin hoặc chính chủ sở hữu garden cập nhật
        if (user.role !== 'admin' && garden.userId !== user.id) {
            throw new ForbiddenException('You are not allowed to update this garden');
        }

        // kiểm tra tên trùng lặp
        const duplicate = await this.prisma.garden.findFirst({
            where:{
                name: dto.name,
                userId: garden.userId
            }
        })

        if (duplicate) {
            throw new BadRequestException('Garden name already exists for this user');
        }

        return await this.prisma.garden.update({
            where: {id},
            data: dto
        })
    }

    // delete garden 
    async deleteGarden(id: number, user: any ){
        const garden = await this.prisma.garden.findUnique({where:{id}})
        if(!garden){
            throw new NotFoundException(`Not found garden: ${id}`)
        }

        if(user.role !== 'admin' && user.id !== garden.userId){
            throw new ForbiddenException('You are not allowed to delete this garden');
        }
        return await this.prisma.garden.delete({
            where: {id},
        })
    }
}