import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
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

        // kiểm tra vegetable có thuộc garden đó không
        if (vegetable.gardenId !== garden.id) {
            throw new BadRequestException('This vegetable does not belong to the specified garden');
        }

        // Tính số lượng hiện tại còn có thể bán
        const availableQuantity = vegetable.quantityIn - vegetable.quantityOut;

        if(dto.quantity > availableQuantity){
            throw new BadRequestException('Quantity sold exceeds available stock')
        }

        // cập nhật lại quantity out
        await this.prisma.vegetable.update({
            where:{id: dto.vegetableId},
            data:{
                quantityOut: vegetable.quantityOut + dto.quantity
            }
        })

        //tạo sale
        return await this.prisma.sale.create({
            data: dto
        })

    }

    // lấy doanh thu


    // lấy doanh thu theo khu vườn
    async getRevenueByGarden(gardenId: number, user: any){
        const garden = await this.prisma.garden.findUnique({
            where:{id:gardenId}
        })

        if(!garden){
            throw new NotFoundException(`Garden ${gardenId} not found`);
        }

        if(user.role !== 'admin' && garden.userId !== user.id){
            throw new ForbiddenException('You are not authorized to view this garden\'s revenue');
        }

        const sales = await this.prisma.sale.findMany({
            where:{gardenId}
        })

        const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0)

        return {
            gardenId,
            totalRevenue,
            numberOfSales: sales.length
        }

    }

    // lấy doanh thu theo thời gian
    async getRevenueByTime(from: string, to: string, user: any){
        const fromDate = new Date(from)
        const toDate = new Date(to)

        if(isNaN(fromDate.getTime()) || isNaN(toDate.getTime())){
            throw new BadRequestException('Invalid date format');
        }

        const sales = await this.prisma.sale.findMany({
            where:{
                soldAt: {
                    gte: fromDate,
                    lte: toDate
                },
                ...(user.role !== 'admin' && {
                    garden:{
                        userId: user.id
                    }
                })
            },
            include: {
                garden: true,
                vegetable: true,
              },
        })

        const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);

        return {
            from,
            to,
            totalRevenue,
            numberOfSales: sales.length,
            sales,
        };
    }

    // truy vấn theo thời gian
    async getRevenueList(unit : 'day'|'week' | 'month', user : any){
        const sales = await this.prisma.sale.findMany({
            where: user.role === 'admin' ? {}: {
                garden:{
                    userId: user.id
                }
            },
            include:{
                garden: true
            }
        })

        const groupKey = (date : Date) =>{
            const d = new Date(date)
            if(unit === 'day') return d.toISOString().slice(0,10)
            if (unit === 'week') {
                const firstDayOfWeek = new Date(d.setDate(d.getDate() - d.getDay()));
                return firstDayOfWeek.toISOString().slice(0, 10);
            }

            if (unit === 'month') return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}`;

            throw new Error(`Invalid unit: ${unit}`);
        };
              
        const revenueMap: Record<string, number> = {};
        for (const sale of sales) {
            const key = groupKey(sale.soldAt);
            revenueMap[key] = (revenueMap[key] || 0) + sale.totalPrice;
        }
              
        return Object.entries(revenueMap).map(([time, revenue]) => ({
            time, revenue
        })
    );
            
    }

}