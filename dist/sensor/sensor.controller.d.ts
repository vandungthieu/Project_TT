import { SensorService } from "./sensor.service";
import { CreateSensorDto } from "./dto/create-sensor.dto";
import { UpdateSensorDto } from "./dto/update-sensor.dto";
export declare class SensorController {
    private readonly sensorService;
    constructor(sensorService: SensorService);
    createSensor(dto: CreateSensorDto, req: any): Promise<{
        id: number;
        gardenId: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
    }>;
    getSensorById(id: number, req: any): Promise<{
        id: number;
        gardenId: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
    }>;
    getSensorByGardenId(gardenId: number, req: any): Promise<{
        id: number;
        gardenId: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
    }[]>;
    getByTime(gardenId: number, from: string, to: string, req: any): Promise<{
        id: number;
        gardenId: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
    }[]>;
    getAverage24h(gardenId: number, req: any): Promise<{
        gardenId: number;
        averageTemperature: string;
        averageHumidity: string;
        totalRecords: number;
        from: Date;
        to: Date;
    }>;
    updateSensor(id: number, dto: UpdateSensorDto, req: any): Promise<{
        id: number;
        gardenId: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
    }>;
    deleteSensor(id: number, req: any): Promise<{
        id: number;
        gardenId: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
    }>;
}
