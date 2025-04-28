import { IsNotEmpty, IsNumber, IsInt, IsISO8601 } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSensorDto {
  @ApiProperty({ description: 'Nhiệt độ đo được', example: 26.5 })
  @IsNumber()
  @IsNotEmpty()
  temperature: number;

  @ApiProperty({ description: 'Độ ẩm đo được', example: 70.2 })
  @IsNumber()
  @IsNotEmpty()
  humidity: number;

  @ApiProperty({ description: 'Thời gian đo (ISO8601)', example: '2025-04-23T14:00:00Z' })
  @IsISO8601()
  @IsNotEmpty()
  timestamp: string;

  @ApiProperty({ description: 'ID của khu vườn', example: 1 })
  @IsInt()
  @IsNotEmpty()
  gardenId: number;
}
