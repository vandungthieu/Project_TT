import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
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

    async getSensorDataByTime(from: string, to: string, gardenId: number, user: any) {
        const garden = await this.prisma.garden.findUnique({
          where: { id: gardenId },
        });
    
        if (!garden) {
          throw new NotFoundException(`Garden with id ${gardenId} not found`);
        }
    
        // Kiểm tra quyền
        if (user.role !== 'admin' && garden.userId !== user.id) {
          throw new ForbiddenException('You are not authorized to access this garden\'s sensor data');
        }
    
        const fromDate = new Date(from);
        const toDate = new Date(to);
    
        if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
          throw new BadRequestException('Invalid date format');
        }
    
        const sensorData = await this.prisma.sensorData.findMany({
          where: {
            gardenId,
            timestamp: {
              gte: fromDate,
              lte: toDate,
            },
          },
          orderBy: {
            timestamp: 'asc',
          },
        });
    
        return sensorData;
      }
    
      async getAverageSensorData24h(gardenId: number, user: any) {
        const garden = await this.prisma.garden.findUnique({
          where: { id: gardenId },
        });
    
        if (!garden) {
          throw new NotFoundException(`Garden with id ${gardenId} not found`);
        }
    
        // Kiểm tra quyền
        if (user.role !== 'admin' && garden.userId !== user.id) {
          throw new ForbiddenException('You are not authorized to access this garden\'s sensor data');
        }
    
        const toDate = new Date();
        const fromDate = new Date(toDate.getTime() - 24 * 60 * 60 * 1000);
    
        const data = await this.prisma.sensorData.findMany({
          where: {
            gardenId,
            timestamp: {
              gte: fromDate,
              lte: toDate,
            },
          },
        });
    
        if (data.length === 0) {
          throw new NotFoundException('No sensor data found for the last 24 hours');
        }
    
        const avgTemp = data.reduce((sum, d) => sum + d.temperature, 0) / data.length;
        const avgHumidity = data.reduce((sum, d) => sum + d.humidity, 0) / data.length;
    
        return {
          gardenId,
          averageTemperature: avgTemp.toFixed(2),
          averageHumidity: avgHumidity.toFixed(2),
          totalRecords: data.length,
          from: fromDate,
          to: toDate,
        };
      
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

    //delete sensor
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