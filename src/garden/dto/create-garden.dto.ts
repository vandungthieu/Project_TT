import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateGardenDto{
    @ApiProperty({description:'Tên khu vườn', type: 'string', example:'khu vườn trên mây'})
    @IsString()
    @IsNotEmpty()
    name : string

    @ApiProperty({ description: 'ID của user sở hữu (chỉ admin cung cấp)', example: 123, required: false })
    @IsInt()
    @IsOptional()
    userId?: number;

}