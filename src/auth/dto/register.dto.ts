import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"

export class RegisterDto{
    @ApiProperty({description:'email đăng ký', type:'string', example:'user@example.com'})
    @IsEmail()
    @IsNotEmpty()
    email: string

    @ApiProperty({description:'tên người dùng', type:'string', example:'User'})
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({description:'mật khẩu đăng ký', type: 'string', example:'123456'})
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string
}