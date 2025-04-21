import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateVegetabletDto{
    @ApiProperty({description: "id của garden", type: "integer", example: 1})
    @IsInt()
    @IsNotEmpty()
    gardenId: number

    @ApiProperty({description:'tên loại rau', type:'string', example: "rau chân vịt"})
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({description:'Số lượng nhập', type:"integer", example:1000})
    @IsInt()
    @IsNotEmpty()
    quantityIn : number 

    @ApiProperty({description:'Số lượng bán', type:"integer", example:1000})
    @IsInt()
    @IsNotEmpty()
    quantityOut : number

    @ApiProperty({description:'giá bán', type:'string', example:2.5})
    @IsNumber({ allowNaN: false, allowInfinity: false })
    @IsOptional()
    price? : number

    // @ApiProperty({ description: 'ID của user sở hữu (chỉ admin cung cấp)', example: 2, required: false })
    // @IsInt()
    // @IsOptional()
    // userId?: number;
}