import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSaleDto } from "./dto/create-sale.dto";

@Injectable()
export class SaleService{
    constructor (private readonly prisma: PrismaService){}

    // create sale
    async createSale(dto: CreateSaleDto, user: any){
        const garden = await this.prisma.garden.findUnique({
            where:{id: dto.gardenId}
        })

        if(!garden){
            throw new NotFoundException(`Garden not found with ID ${dto.gardenId}`);
        }

        // nếu không phải admin thì chỉ tạo sale cho mình
        if(user.role !== 'admin' && user.id !== garden.userId){
            throw new ForbiddenException('You are not authorized to create a sale for this garden')
        }
        const vegetable = await this.prisma.vegetable.findUnique({
            where: { id: dto.vegetableId },
          });
        
          if (!vegetable) {
            throw new NotFoundException(`Vegetable not found with ID ${dto.vegetableId}`);
        }

        // kiểm tra vegetable có thuộc 

    }
}