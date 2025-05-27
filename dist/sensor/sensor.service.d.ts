import { PrismaService } from "src/prisma/prisma.service";
import { CreateSensorDto } from "./dto/create-sensor.dto";
import { UpdateSensorDto } from "./dto/update-sensor.dto";
export declare class SensorService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSensor(dto: CreateSensorDto, user: any): Promise<{
        id: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
        gardenId: number;
    }>;
    getSensorById(id: number, user: any): Promise<{
        id: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
        gardenId: number;
    }>;
    getSensor(user: any): Promise<{
        id: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
        gardenId: number;
    }[]>;
    getSensorDataByTime(from: string, to: string, gardenId: number, user: any): Promise<{
        id: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
        gardenId: number;
    }[]>;
    getAverageSensorData24h(gardenId: number, user: any): Promise<{
        gardenId: number;
        averageTemperature: string;
        averageHumidity: string;
        totalRecords: number;
        from: Date;
        to: Date;
    }>;
    getSensorByGarden(gardenId: number, user: any): Promise<{
        id: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
        gardenId: number;
    }[]>;
    updateSensor(id: number, dto: UpdateSensorDto, user: any): Promise<{
        id: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
        gardenId: number;
    }>;
    deleteSensor(id: number, user: any): Promise<{
        id: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
        gardenId: number;
    }>;
}
