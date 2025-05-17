import { PrismaService } from "src/prisma/prisma.service";
import { CreateSensorDto } from "./dto/create-sensor.dto";
import { UpdateSensorDto } from "./dto/update-sensor.dto";
export declare class SensorService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSensor(dto: CreateSensorDto, user: any): Promise<{
        id: number;
        gardenId: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
    }>;
    getSensorById(id: number, user: any): Promise<{
        id: number;
        gardenId: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
    }>;
    getSensor(user: any): Promise<{
        id: number;
        gardenId: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
    }[]>;
    getSensorDataByTime(from: string, to: string, gardenId: number, user: any): Promise<{
        id: number;
        gardenId: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
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
        gardenId: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
    }[]>;
    updateSensor(id: number, dto: UpdateSensorDto, user: any): Promise<{
        id: number;
        gardenId: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
    }>;
    deleteSensor(id: number, user: any): Promise<{
        id: number;
        gardenId: number;
        temperature: number;
        humidity: number;
        timestamp: Date;
    }>;
}
