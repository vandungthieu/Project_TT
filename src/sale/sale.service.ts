import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSaleDto } from "./dto/create-sale.dto";

@Injectable()
export class SaleService{
    constructor (private readonly prisma: PrismaService){}

    // create sale
    async createSale(dto: CreateSaleDto, user: any){
        const vegetable = await this.prisma.vegetable.findUnique({
            where: { id: dto.vegetableId },
          });
        
        if (!vegetable) {
            throw new NotFoundException(`Vegetable not found with ID ${dto.vegetableId}`);
        }

        const garden = await this.prisma.garden.findUnique({
            where:{id: vegetable.gardenId}
        })

        if(!garden){
            throw new NotFoundException(`Garden not found`);
        }

        // nếu không phải admin thì chỉ tạo sale cho mình
        if(user.role !== 'admin' && user.id !== garden.userId){
            throw new ForbiddenException('You are not authorized to create a sale for this vegetable')
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
            data: {
                gardenId: garden.id,
                vegetableId: dto.vegetableId,
                quantity: dto.quantity,
                totalPrice: dto.totalPrice,
                soldAt: new Date(dto.soldAt),
            }
        })

    }

    // lấy doanh thu theo người dùng
    async getRevenue( user: any){
        const sales = await this.prisma.sale.findMany({
            where:{
                ...(user.role !== 'admin' && {
                    garden:{
                        userId: user.id
                    }
                })
            },
            // include: {
            //     garden: true,
            //     vegetable: true,
            // },
        })

        const totalRevenue = sales.reduce((sum, sale) => sum + sale.totalPrice, 0);

        return {
            totalRevenue,
            numberOfSales: sales.length,
            sales,
        };
    }

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

    // truy vấn theo thời gian
    async getRevenueList(unit : 'day'|'week' | 'month', user : any,  from?: string, to?: string){
        const whereCondition : any = {}

        if(user.role !== 'admin'){
            whereCondition.garden = {userId: user.id}
        }

        if(from || to){
            whereCondition.time = {}
            if(from) whereCondition.time.gte = new Date(from);
            if(to) whereCondition.time.lte = new Date(to)
        }

        const sales = await this.prisma.sale.findMany({
            where: whereCondition,
            include:{
                garden: true
            }
        })

        const groupKey = (date : Date) =>{
            const d = new Date(date)
            if(unit === 'day') return d.toISOString().slice(0,10) //cắt chuỗi 10 ký tự
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
              
        const data =  Object.entries(revenueMap).map(([time, revenue]) => ({
            time, revenue
        }));

        const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);

        return {
            unit,
            from: from || null,
            to: to || null,
            totalRevenue,
            data
        };
            
    }

}