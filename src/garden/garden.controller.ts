import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GardenService } from "./garden.service";
import { CreateGardenDto } from "./dto/create-garden.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UpdateGardenDto } from "./dto/update-garden.dto";

@ApiTags('gardens')
@Controller('gardens')
export class GardenController{
    constructor(private readonly gardenService: GardenService){}

    @Get()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Lấy danh sách garden của user hiện tại' })
    @ApiResponse({ status: 200, description: 'Lấy thành công danh sách garden', type: [CreateGardenDto] })
    @ApiResponse({ status: 401, description: 'Chưa xác thực' })
    @ApiResponse({ status: 404, description: 'Không tìm thấy garden' })
    async getGardens(@Request() req) { 
        return this.gardenService.getGarden(req.user);
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
        return this.gardenService.getGardenById(id, req.user)
    }


    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'tạo garden mới '})
    @ApiResponse({status:201, description:"tạo thành công garden", type: CreateGardenDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    createGarden(@Body()dto: CreateGardenDto,@Request() req){
        return this.gardenService.createGarden(dto, req.user)
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'update garden theo id) '})
    @ApiResponse({status:201, description:"update thành công garden", type: CreateGardenDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    @ApiResponse({status: 404, description:"Không tìm thấy garden"})
    updateGardenById(@Param('id', ParseIntPipe) id : number, @Body() dto: UpdateGardenDto, @Request() req){
        return this.gardenService.updateGardenById(id, dto, req.user )
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'xóa garden theo id) '})
    @ApiResponse({status:201, description:"xóa thành công garden"})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    @ApiResponse({status: 404, description:"Không tìm thấy garden"})
    deleteGarden(@Param('id', ParseIntPipe) id : number, @Request() req ){
        return this.gardenService.deleteGarden(id, req.user)
    }

}