import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService{
    constructor(
        private prisma : PrismaService,
        private jwtService: JwtService
    ){}

    // đăng ký
    async register(dto: RegisterDto){
            const existingUser = await this.prisma.user.findUnique({where: {email:dto.email}})

            if(existingUser){
                throw new ConflictException("Email already exists");
            }

            const hasedPassword = await bcrypt.hash(dto.password,10)
            return await this.prisma.user.create({
                data: {
                    ...dto,
                    password: hasedPassword
                }
            })
        
    }

    //xác thực tài khoản
    async validateUser(email: string, password: string){
        const user = await this.prisma.user.findUnique({where: {email:email}})
        if(!user || !(await bcrypt.compare(password, user.password))){
            throw new UnauthorizedException('Invalid Email or Password');
        }

        const{password:_password, ...userData} = user
        return userData
    }

    //create token
    createToken(user: any){
        const payload = {sub: user.id, email: user.email, role: user.role}
        return {
            access_token: this.jwtService.sign(payload),
            user
        }
    }


}