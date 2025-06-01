import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class LoginDto{
    @ApiProperty({description:'email đăng nhập', type:"string", example:"user1@gmail.com"})
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({description:'mật khẩu', type:"string", example:'passwordUser1'})
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string
}