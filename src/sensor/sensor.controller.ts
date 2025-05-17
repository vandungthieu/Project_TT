import { Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { SensorService } from "./sensor.service";
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateSensorDto } from "./dto/create-sensor.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { UpdateSensorDto } from "./dto/update-sensor.dto";

@ApiTags('sensor')
@Controller('sensors')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SensorController{
    constructor (private readonly sensorService : SensorService){}

    // create sensor
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'thêm sensor mới '})
    @ApiResponse({status:201, description:"thêm thành công vegetable", type: CreateSensorDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    createSensor(dto: CreateSensorDto, @Request() req){
        return this.sensorService.createSensor(dto, req.user)
    }

    // get sensor by id
    @Get(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'lấy sensor theo id  '})
    @ApiQuery({ name: 'page', type: Number, required: false, description: 'Số trang (mặc định: 1)' })
    @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Số bản ghi mỗi trang (mặc định: 10)' })
    @ApiResponse({status:200, description:"lấy thành công", type: CreateSensorDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    @ApiResponse({status: 404, description: "Không tìm thấy garden"})
    getSensorById(@Param('id', ParseIntPipe) id: number, @Request() req){
        return this.sensorService.getSensorById(id, req.user)
    }

    //get sensor by garden id
    @Get('/garden:id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'lấy sensor theo garden id  '})
    @ApiQuery({ name: 'page', type: Number, required: false, description: 'Số trang (mặc định: 1)' })
    @ApiQuery({ name: 'limit', type: Number, required: false, description: 'Số bản ghi mỗi trang (mặc định: 10)' })
    @ApiResponse({status:200, description:"lấy thành công", type: CreateSensorDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    @ApiResponse({status: 404, description: "Không tìm thấy garden"})
    getSensorByGardenId(@Param('gardenId', ParseIntPipe) gardenId: number, @Request() req){
        return this.sensorService.getSensorByGarden(gardenId, req.user)
    }

    // get theo time
    @Get('garden/:gardenId')
    @ApiOperation({ summary: 'Lấy dữ liệu cảm biến của garden theo khoảng thời gian' })
    @ApiResponse({ status: 200, description: 'Thành công' })
    getByTime(
      @Param('gardenId', ParseIntPipe) gardenId: number,
      @Query('from') from: string,
      @Query('to') to: string,
      @Request() req,
    ) {
      return this.sensorService.getSensorDataByTime(from, to, gardenId, req.user);
    }

    // get 24h
    @Get('garden/:gardenId/average')
    @ApiOperation({ summary: 'Lấy nhiệt độ và độ ẩm trung bình 24h qua' })
    @ApiResponse({ status: 200, description: 'Thành công' })
    getAverage24h(
      @Param('gardenId', ParseIntPipe) gardenId: number,
      @Request() req,
    ) {
      return this.sensorService.getAverageSensorData24h(gardenId, req.user);
    }

    // update sensor
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'cập nhật sensor '})
    @ApiResponse({status:201, description:"thành công", type: CreateSensorDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    @ApiResponse({status: 404, description: "Không tìm thấy sensor"})
    updateSensor(@Param('id', ParseIntPipe) id: number, dto: UpdateSensorDto, @Request() req){
        return this.sensorService.updateSensor(id, dto, req.user)
    }

    // delete sensor
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({summary:'Xoá sensor '})
    @ApiResponse({status:201, description:"thành công", type: CreateSensorDto})
    @ApiResponse({status:401, description: "chưa xác thực"})
    @ApiResponse({status: 403, description: "Không có quyền truy cập"})
    @ApiResponse({status: 404, description: "Không tìm thấy sensor"})
    deleteSensor(@Param('id', ParseIntPipe) id: number, @Request() req){
        return this.sensorService.deleteSensor(id, req.user)
    }


}