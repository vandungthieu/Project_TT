import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateVegetabletDto } from "./dto/create-vegetable.dto";
import { UpdateVegetableDto } from "./dto/update-vegetable.dto";

@Injectable()
export class VegetableService{
    constructor(private readonly prisma : PrismaService){}

    // thêm loại rau
    async createVegetable(dto: CreateVegetabletDto, user : any){
       if(dto.quantityIn < dto.quantityOut){
        throw new BadRequestException('Số lượng bán không được lớn hớn số lượng nhập')
       }
       const garden = await this.prisma.garden.findUnique({
        where:{id: dto.gardenId}
       })

       if (!garden) {
        throw new NotFoundException('Garden not found');
      }

      if(user.role !== 'admin' && garden.userId !== user.id){
        throw new ForbiddenException('You are not authorized to create a vegetable in this garden')
      }

       return await this.prisma.vegetable.create({
        data: dto
       })
    }

    //lấy tất cả danh sách rau
    async getAllVegetable(user: any ){
        if(user.role === 'admin'){
            return await this.prisma.vegetable.findMany()
        } else{
            const userId = user.id
            const vegetables = await this.prisma.vegetable.findMany({
                where:{
                    garden:{
                         userId
                    }
                }
            })
            if (!vegetables || vegetables.length === 0) {
                throw new NotFoundException(`Không tìm thấy loại rau nào cho userId: ${userId}`);
              }
            
              return vegetables;
        }
    }


    //lấy vegetable bởi id
    async getVegetableById(id: number, user: any){
        const vegetable = await this.prisma.vegetable.findUnique({
            where: {id}
        })
        if(!vegetable){
            throw new NotFoundException(`Not found vegetable: ${id}`)
        }

        const garden = await this.prisma.garden.findUnique({
            where: { id: vegetable.gardenId }, 
        });

        if(!garden){
            throw new NotFoundException(`Not found garden`)
        }

        if(user.role !== 'admin' && user.id !== garden.userId){
            throw new ForbiddenException('You are not authorized to get vegetables in this garden')
        }
        
       return vegetable
    }


    // lấy tất cả các loại rau bởi 1 người dùng
    async getVegetableByUser(userId: number){
        const vegetables = await this.prisma.vegetable.findMany({
            where:{
                garden:{
                     userId
                }
            }
        })
        if (!vegetables || vegetables.length === 0) {
            throw new NotFoundException(`Không tìm thấy loại rau nào cho userId: ${userId}`);
          }
        
          return vegetables;
    }

    // lấy danh sách rau bởi 1 khu vườn
    async getVegetable(gardenId: number, user: any){
        const garden = await this.prisma.garden.findUnique({
            where: {id: gardenId}
        })
        if(!garden){
            throw new NotFoundException(`Not found garden: ${gardenId}`)
        }

        if(user.role !== 'admin' && user.id !== garden.userId){
            throw new ForbiddenException('You are not authorized to get vegetables in this garden')
        }
        const vegetable = await this.prisma.vegetable.findMany({
            where: {gardenId}
        })
       if(vegetable.length === 0){
        throw new NotFoundException(`No vegetables found in garden ${gardenId}`)
       }
       return vegetable
    }

    // cập nhật rau
    async updateVegetable(id: number, dto: UpdateVegetableDto){
        const vegetable = await this.prisma.vegetable.findUnique({
            where: {id}
        })
        if(!vegetable){
            throw new NotFoundException(`Not found vegetable: ${id}`)
        }
        return await this.prisma.vegetable.update({
            where:{id},
            data: dto
        })
    }

    // nhập giá của rau
    async  createPrice(id: number,  dto: UpdateVegetableDto){
        const vegetable = await this.prisma.vegetable.findUnique({
            where: {id}
        })
        if(!vegetable){
            throw new NotFoundException(`Not found vegetable: ${id}`)
        }
        return await this.prisma.vegetable.update({
            where:{id},
            data: dto
        })
    }

    //sửa giá
    async  updatePrice(id: number,  dto: UpdateVegetableDto){
        const vegetable = await this.prisma.vegetable.findUnique({
            where: {id}
        })
        if(!vegetable){
            throw new NotFoundException(`Not found vegetable: ${id}`)
        }
        return await this.prisma.vegetable.update({
            where:{id},
            data: dto
        })
    }

    //lấy giá
    async getPrice(id: number){
        const vegetable = await this.prisma.vegetable.findUnique({
            where: {id}
        })
        if(!vegetable){
            throw new NotFoundException(`Not found vegetable: ${id}`)
        }
        return vegetable.price
    }

    // xóa giá
    async deletePrice(id: number){
        const vegetable = await this.prisma.vegetable.findUnique({
            where: {id}
        })
        if(!vegetable){
            throw new NotFoundException(`Not found vegetable id: ${id}`)
        }

        return await this.prisma.vegetable.update({
            where:{id},
            data:{
                price: null
            }
        })
    }

}