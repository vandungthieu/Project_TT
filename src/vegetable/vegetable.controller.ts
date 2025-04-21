import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { VegetableService } from "./vegetable.service";
import { CreateVegetabletDto } from "./dto/create-vegetable.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { OwnershipGuard } from "src/auth/guards/ownership.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UpdateVegetableDto } from "./dto/update-vegetable.dto";

@ApiTags('vegetables')
@Controller('vegetables')
export class VegetableController{
    constructor(private readonly vegetableService: VegetableService){}

    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'thêm vegetable mới '})
    @ApiResponse({status:201, description:"thêm thành công vegetable", type: CreateVegetabletDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    createVegetable(@Body()dto: CreateVegetabletDto, @Request() req){
        return this.vegetableService.createVegetable(dto, req.user)
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'lấy vegetable'})
    @ApiResponse({status:200, description:"lấy thành công vegetable", type: CreateVegetabletDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    getAllVegetable(@Request() req){
        return this.vegetableService.getAllVegetable(req.user)
    }

    // @Get()
    // @UseGuards(JwtAuthGuard,OwnershipGuard)
    // @ApiBearerAuth()
    // @ApiOperation({summary:'lấy vegetable '})
    // @ApiResponse({status:200, description:"lấy thành công", type: CreateVegetabletDto})
    // @ApiResponse({status:401, description: "chưa xác thực"})
    // @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    // @ApiResponse({status: 404, description: "Không tìm thấy userId"})
    // getVegetableByUserId(@Param('userId', ParseIntPipe) usedId: number){
    //     return this.vegetableService.getVegetableByUser(usedId)
    // }

    @Get('garden/:gardenId')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'lấy vegetable theo garden id  '})
    @ApiResponse({status:201, description:"lấy thành công", type: CreateVegetabletDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    @ApiResponse({status: 404, description: "Không tìm thấy garden"})
    getVegetable(@Param('gardenId', ParseIntPipe) gardeId: number, @Request() req ){
        return this.vegetableService.getVegetable(gardeId, req.user)
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'cập nhật vegetable '})
    @ApiResponse({status:201, description:"thành công", type: CreateVegetabletDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    @ApiResponse({status: 404, description: "Không tìm thấy vegetable"})
    updateVegetable(@Param('id', ParseIntPipe) id: number,dto: UpdateVegetableDto , @Request() req ){
        return this.vegetableService.updateVegetable(id, dto)
    }

    @Put(':id/price')
    @UseGuards(JwtAuthGuard,OwnershipGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'cập nhật vegetable price '})
    @ApiResponse({status:201, description:"thành công", type: CreateVegetabletDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    @ApiResponse({status: 404, description: "Không tìm thấy vegetable"})
    createPrice(@Param('id', ParseIntPipe) id: number,dto: UpdateVegetableDto){
        return this.vegetableService.createPrice(id, dto)
    }

    @Delete(':id/price')
    @UseGuards(JwtAuthGuard,OwnershipGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'xóa vegetable price '})
    @ApiResponse({status:201, description:"thành công"})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    @ApiResponse({status: 404, description: "Không tìm thấy vegetable"})
    deletePrice(@Param('id', ParseIntPipe) id: number){
        return this.vegetableService.deletePrice(id)
    }

    @Get(':id/price')
    @UseGuards(JwtAuthGuard,OwnershipGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'lấy vegetable price '})
    @ApiResponse({status:201, description:"thành công"})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    @ApiResponse({status: 404, description: "Không tìm thấy vegetable"})
    getPrice(@Param('id', ParseIntPipe) id: number){
        return this.vegetableService.getPrice(id)
    }
}