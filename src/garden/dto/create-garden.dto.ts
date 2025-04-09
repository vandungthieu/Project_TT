import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateGardenDto{
    @ApiProperty({description:'Tên khu vườn', type: 'string', example:'khu vườn trên mây'})
    @IsString()
    @IsNotEmpty()
    name : string

    @ApiProperty({description:'id chủ sở hữu', type:'integer', example: 123})
    @IsInt()
    @IsNotEmpty()
    ownerId : number


}