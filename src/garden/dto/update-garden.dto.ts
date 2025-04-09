import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateGardenDto{
    @ApiProperty({description:'tên khu vườn', type: 'string', example:"khu vườn trên mây"})
    @IsString()
    name : string
}