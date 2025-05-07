import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { SensorService } from "./sensor.service";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateSensorDto } from "./dto/create-sensor.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@ApiTags('sensor')
@Controller('sensors')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SensorController{
    constructor (private readonly sensorService : SensorService){}

    // create sensor
    @Post()
    createSensor(dto: CreateSensorDto, @Request() req){
        return this.sensorService.createSensor(dto, req.user)
    }

    @Get()
    get

}