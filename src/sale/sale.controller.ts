import { Body, Controller, Get, Param, Post, Query, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SaleService } from "./sale.service";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@ApiTags('sales')
@Controller('sales')
export class SaleController{
    constructor(private readonly saleService: SaleService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'thêm sale mới '})
    @ApiResponse({status:201, description:"thêm thành công sale", type: CreateSaleDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    createSale(@Body() dto: CreateSaleDto, @Request() req){
        return this.saleService.createSale(dto, req.user)
    }

    // lấy doanh thu theo khu vườn
    @Get('garden/:gardenId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'lấy doanh thu theo khu vườn'})
    @ApiQuery({ name: 'page', type: Number, required: false, description: 'Số trang (mặc định: 1)' })
    @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Số bản ghi mỗi trang (mặc định: 10)' })
    @ApiResponse({status:200, description:"lấy thành công doanh thu", type: CreateSaleDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    getSaleByGarden(@Param('gardenId') gardenId: number, @Request() req ){
        return this.saleService.getRevenueByGarden(gardenId, req.user)
    }

    // lấy doanh thu theo user
    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'lấy doanh thu theo người dùng'})
    @ApiQuery({ name: 'page', type: Number, required: false, description: 'Số trang (mặc định: 1)' })
    @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Số bản ghi mỗi trang (mặc định: 10)' })
    @ApiResponse({status:200, description:"lấy thành công doanh thu", type: CreateSaleDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    getSale(@Request() req){
        return this.saleService.getRevenue(req.user)
    }

    // lấy doanh thu theo thời gian
    @Get('all/price')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'lấy doanh thu theo thời gian'})
    @ApiQuery({ name: 'page', type: Number, required: false, description: 'Số trang (mặc định: 1)' })
    @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Số bản ghi mỗi trang (mặc định: 10)' })
    @ApiResponse({status:200, description:"lấy thành công doanh thu", type: CreateSaleDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    getTotalRevenue(
        @Query('unit') unit :  'day' | 'week' | 'month',
        @Query('from') from: string,
        @Query('to') to: string,
        @Request() req 
    ){
        return this.saleService.getRevenueList(unit, req.user, from, to)
    }
}
