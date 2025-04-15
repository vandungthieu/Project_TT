import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GardenService } from "./garden.service";
import { CreateGardenDto } from "./dto/create-garden.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { OwnershipGuard } from "src/auth/guards/ownership.guard";
import { UpdateGardenDto } from "./dto/update-garden.dto";

@ApiTags('gardens')
@Controller('gardens')
export class GardenController{
    constructor(private readonly gardenService: GardenService){}

    @Get()
    @UseGuards(JwtAuthGuard,RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({summary:'lấy tất cả garden (chỉ admin) '})
    @ApiResponse({status:201, description:"lấy thành công garden", type: CreateGardenDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    getAllGarden(){
        return this.gardenService.getAllGarden()
    }

    @Get('user')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Lấy danh sách garden của user hiện tại' })
    @ApiResponse({ status: 200, description: 'Lấy thành công danh sách garden', type: [CreateGardenDto] })
    @ApiResponse({ status: 401, description: 'Chưa xác thực' })
    @ApiResponse({ status: 404, description: 'Không tìm thấy garden' })
    async getGardens(@Request() req) {
        console.log('User from token:', req.user); 
        const userId = req.user.id;
        return this.gardenService.getGardenByUserId(userId);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'lấy garden theo Id) '})
    @ApiResponse({status:200, description:"lấy thành công garden", type: CreateGardenDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    @ApiResponse({status: 404, description:"Không tìm thấy user"})
    getGardenById(@Param('id', ParseIntPipe) id: number, @Request() req){
        return this.gardenService.getGardenById(id, req.user.id)
    }


    @Post()
    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'tạo garden mới '})
    @ApiResponse({status:201, description:"tạo thành công garden", type: CreateGardenDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    createGarden(@Body()dto: CreateGardenDto,@Request() req){
        const userId = req.user.id; // Lấy userId từ token
        return this.gardenService.createGarden(dto, userId)
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard,OwnershipGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'update garden theo id) '})
    @ApiResponse({status:201, description:"update thành công garden", type: CreateGardenDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    @ApiResponse({status: 404, description:"Không tìm thấy garden"})
    updateGardenById(@Param('id', ParseIntPipe) id : number, @Body() dto: UpdateGardenDto){
        return this.gardenService.updateGardenById(id, dto)
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard,OwnershipGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'xóa garden theo id) '})
    @ApiResponse({status:201, description:"xóa thành công garden"})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    @ApiResponse({status: 404, description:"Không tìm thấy garden"})
    deleteGarden(@Param('id', ParseIntPipe) id : number){
        return this.gardenService.deleteGarden(id)
    }

}