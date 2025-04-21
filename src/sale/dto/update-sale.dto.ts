import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsISO8601, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class UpdateSaleDto{
     @ApiProperty({description:'Số lượng bán', type:"integer", example:1000})
     @IsInt()
     @IsOptional()
     quantitySold? : number 
        
        
     @ApiProperty({description:'tổng giá bán', type:'string', example:2.5})
     @IsNumber({ allowNaN: false, allowInfinity: false })
     @IsOptional()
     totalPrice? : number
    
}