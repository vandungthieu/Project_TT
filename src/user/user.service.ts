import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt"
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService{
    constructor(private readonly prisma: PrismaService){}

    //get user
    async getAllUser(){
        return await this.prisma.user.findMany()
    }

    // get user by id
    async getUserById(id: number){
       const user = await this.prisma.user.findUnique({
        where:{id}
       })

       if(!user){
        throw new NotFoundException(`not found user: ${id}`)
       }
       return user
    }

    // update user
    async updateUser(id: number, dto: UpdateUserDto){
        const user = await this.prisma.user.findUnique({
            where:{id}
        })

        if(!user){
            throw new NotFoundException(`Not found user: ${id}`)
        }
        return await this.prisma.user.update({
            where:{id},
            data:dto
        })
    }

    //delete user 
    async deleteUser(id: number){
        const user = await this.prisma.user.findUnique({
            where:{id}
        })

        if(!user){
            throw new NotFoundException(`Not found user: ${id}`)
        }
        return await this.prisma.user.delete({
            where:{id}
        })
    }

    //create admin
    async createAdmin(dto: CreateUserDto){
        const  existingUser = await this.prisma.user.findUnique({where: {email: dto.email}})

        if(existingUser){
            throw new ConflictException('Email already exists');
        }

        const hasedPassword = await bcrypt.hash(dto.password, 10)

        return await this.prisma.user.create({
           data:{
            ...dto,
            password:hasedPassword,
            role : 'admin'
           }
        })
    }

    // update user role
    async updateUserRole(identifier: { id: number } | { email: string }) {
        const user = await this.prisma.user.findUnique({
            where: identifier
        });
        
        if (!user) {
            throw new NotFoundException('User not found');
        }
    
        return await this.prisma.user.update({
            where: { id: user.id },
            data: { role: "admin" },
        });
    }

    async getPass(){
        const adminPass = await bcrypt.hash("admin123",10)
        const pass2 = await bcrypt.hash("passwordUser1",10)
        const pass3 = await bcrypt.hash("passwordUser2",10)
        const pass4 = await bcrypt.hash("passwordUser3",10)
        console.log(adminPass)
        console.log(pass2)
        console.log(pass3)
        console.log(pass4)
    }


}

//  const user = new UserService(new PrismaService)
//  user.getPass()