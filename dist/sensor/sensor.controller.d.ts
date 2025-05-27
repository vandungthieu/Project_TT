import { SensorService } from "./sensor.service";
import { CreateSensorDto } from "./dto/create-sensor.dto";
import { UpdateSensorDto } from "./dto/update-sensor.dto";
export declare class SensorController {
    private readonly sensorService;
    constructor(sensorService: SensorService);
    createSensor(dto: CreateSensorDto, req: any): Promise<{
        id: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
        gardenId: number;
    }>;
    getSensorById(id: number, req: any): Promise<{
        id: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
        gardenId: number;
    }>;
    getSensorByGardenId(gardenId: number, req: any): Promise<{
        id: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
        gardenId: number;
    }[]>;
    getByTime(gardenId: number, from: string, to: string, req: any): Promise<{
        id: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
        gardenId: number;
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
        temperature: number;
        humidity: number;
        timestamp: Date;
        gardenId: number;
    }>;
    deleteSensor(id: number, req: any): Promise<{
        id: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
        gardenId: number;
    }>;
}
