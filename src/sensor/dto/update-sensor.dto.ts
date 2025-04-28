import { IsNotEmpty, IsNumber, IsInt, IsISO8601, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSensorDto {
  @ApiProperty({ description: 'Nhiệt độ đo được', example: 26.5 })
  @IsNumber()
  @IsOptional()
  temperature?: number;

  @ApiProperty({ description: 'Độ ẩm đo được', example: 70.2 })
  @IsNumber()
  @IsOptional()
  humidity?: number;

  @ApiProperty({ description: 'Thời gian đo (ISO8601)', example: '2025-04-23T14:00:00Z' })
  @IsISO8601()
  @IsOptional()
  timestamp?: string;

}
