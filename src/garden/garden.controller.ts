import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
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

    @Get('user:userId')
    @UseGuards(JwtAuthGuard,OwnershipGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'lấy garden theo userId) '})
    @ApiResponse({status:201, description:"lấy thành công garden", type: CreateGardenDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    @ApiResponse({status: 404, description:"Không tìm thấy user"})
    getGardenByUserId(@Param('userId', ParseIntPipe) userId : number){
        return this.gardenService.getGardenByUserId(userId)
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard,OwnershipGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'lấy garden theo id) '})
    @ApiResponse({status:201, description:"lấy thành công garden", type: CreateGardenDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    @ApiResponse({status: 404, description:"Không tìm thấy garden"})
    getGardenById(@Param('id', ParseIntPipe) id : number){
        return this.gardenService.getGardenById(id)
    }

    @Post()
    @UseGuards(JwtAuthGuard,OwnershipGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'tạo garden mới '})
    @ApiResponse({status:201, description:"tạo thành công garden", type: CreateGardenDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    createGarden(@Body()dto: CreateGardenDto){{
        return this.gardenService.createGarden(dto)
    }}

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