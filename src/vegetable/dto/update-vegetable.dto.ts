import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class UpdateVegetableDto{
    
        @ApiProperty({description:'tên loại rau', type:'string', example: "rau chân vịt"})
        @IsString()
        @IsOptional()
        name?: string
    
        @ApiProperty({description:'Số lượng nhập', type:"integer", example:1000})
        @IsInt()
        @IsOptional()
        quantityIn? : number 
    
        @ApiProperty({description:'Số lượng bán', type:"integer", example:1000})
        @IsInt()
        @IsOptional()
        quantityOut? : number
    
        @ApiProperty({description:'giá bán', type:'string', example:2.5})
        @IsNumber({ allowNaN: false, allowInfinity: false })
        @IsOptional()
        price? : number
}