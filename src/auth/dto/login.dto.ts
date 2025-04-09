import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class LoginDto{
    @ApiProperty({description:'email đăng nhập', type:"string", example:"user@example.com"})
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({description:'mật khẩu', type:"string", example:'123456'})
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string
}