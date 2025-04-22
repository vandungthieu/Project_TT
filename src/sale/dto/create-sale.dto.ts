import { ApiProperty } from "@nestjs/swagger"
import { IsInt, IsISO8601, IsNotEmpty, IsNumber } from "class-validator"

export class CreateSaleDto{
        @ApiProperty({description: "id của garden", type: "integer", example: 1})
        @IsInt()
        @IsNotEmpty()
        gardenId: number
    
        @ApiProperty({description: "id của vegetable", type: "integer", example: 1})
        @IsInt()
        @IsNotEmpty()
        vegetableId: number
    
        @ApiProperty({description:'Số lượng bán', type:"integer", example:1000})
        @IsInt()
        @IsNotEmpty()
        quantity : number 
    
    
        @ApiProperty({description:'tổng giá bán', type:'string', example:2.5})
        @IsNumber({ allowNaN: false, allowInfinity: false })
        @IsNotEmpty()
        totalPrice : number

        @ApiProperty({ description: 'Thời gian bán (ISO 8601)', example: '2025-02-31T14:30:00Z', type: String })
        @IsNotEmpty()
        @IsISO8601()
        soldAt: string;
        
}