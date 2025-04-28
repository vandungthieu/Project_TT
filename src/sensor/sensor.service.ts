import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSensorDto } from "./dto/create-sensor.dto";
import { UpdateSensorDto } from "./dto/update-sensor.dto";

@Injectable()
export class SensorService{
    constructor (private readonly prisma: PrismaService){}

    // create sensor 
    async createSensor(dto: CreateSensorDto, user: any){
        const garden = await this.prisma.garden.findUnique({
            where: {id: dto.gardenId}
        })
        if(!garden){
            throw new NotFoundException(`Garden with id ${dto.gardenId} not found`)
        }
        
        if(user.role !== 'admin' && garden.userId !== user.id){
            throw new ForbiddenException('You are not authorized to create a sensor in this garden')
        }

        return await this.prisma.sensorData.create({
            data: dto
        })
    }

    // find sensor by id
    async getSensorById(id: number, user:any){
        const sensor = await this.prisma.sensorData.findUnique({
            where:{id}
        })
        if(!sensor){
            throw new NotFoundException('sensor not found')
        }

        const garden = await this.prisma.garden.findUnique({
            where: {id: sensor.gardenId}
        })

        if(!garden){
            throw new NotFoundException(`Not found garden`)
        }

        if(user.role !== 'admin' && user.id !== garden.userId){
            throw new ForbiddenException('You are not authorized to get sensor in this garden')
        }
        
        return sensor
    }

    //get all sensor
    async getSensor(user: any){
        if(user.role ==='admin'){
            return await this.prisma.sensorData.findMany()
        }

        const userId = user.id
        const sensor = await this.prisma.sensorData.findMany({
            where:{
                garden:{
                    userId
                }
            }
        })
        if (!sensor || sensor.length === 0) {
            throw new NotFoundException(`Không tìm thấy sensor nào cho userId: ${userId}`);
        }
        
        return sensor;
    }

    // get sensor by garden
    async getSensorByGarden(gardenId: number, user: any){
        const garden = await this.prisma.garden.findUnique({
            where:{id: gardenId}
        })
        if(!garden){
            throw new NotFoundException('not found garden')
        }
        if(user.role !== 'admin' && garden.userId !== user.id){
            throw new ForbiddenException('You are not authorized to get sensor in this garden')
        }
        return await this.prisma.sensorData.findMany({
            where: {gardenId}
        })
    }

    //update sensor
    async updateSensor(id: number, dto: UpdateSensorDto, user: any){
        const sensor = await this.prisma.sensorData.findUnique({
            where:{id}
        })
        if(!sensor){
            throw new NotFoundException('sensor not found')
        }

        const garden = await this.prisma.garden.findUnique({
            where: {id: sensor.gardenId}
        })

        if(!garden){
            throw new NotFoundException(`Not found garden`)
        }

        if(user.role !== 'admin' && user.id !== garden.userId){
            throw new ForbiddenException('You are not authorized to get sensor in this garden')
        }

        return await this.prisma.sensorData.update({
            where:{id},
            data: dto
        })
    }

    async deleteSensor(id: number, user: any){
        const sensor = await this.prisma.sensorData.findUnique({
            where:{id}
        })
        if(!sensor){
            throw new NotFoundException('sensor not found')
        }

        const garden = await this.prisma.garden.findUnique({
            where: {id: sensor.gardenId}
        })

        if(!garden){
            throw new NotFoundException(`Not found garden`)
        }

        if(user.role !== 'admin' && user.id !== garden.userId){
            throw new ForbiddenException('You are not authorized to get sensor in this garden')
        }

        return await this.prisma.sensorData.delete({
            where:{id}
        })
    }
}