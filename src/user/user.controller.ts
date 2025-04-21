import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Request, UseGuards } from "@nestjs/common"
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger"
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard"
import { RolesGuard } from "src/auth/guards/roles.guard"
import { UserService } from "./user.service"
import { Roles } from "src/common/decorators/roles.decorator"
import { CreateUserDto } from "./dto/create-user.dto"
import { OwnershipGuard } from "src/auth/guards/ownership.guard"
import { UpdateUserDto } from "./dto/update-user.dto"

@ApiTags('users')
@Controller('users')
export class UserController{
    constructor(private readonly userService : UserService){}


    @UseGuards(JwtAuthGuard, RolesGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Tạo một Admin mới (chỉ Admin)' })
    @ApiResponse({ status: 201, description: 'Admin được tạo', type: CreateUserDto })
    @ApiResponse({ status: 401, description: 'Chưa xác thực' })
    @ApiResponse({ status: 403, description: 'Không có quyền (yêu cầu vai trò ADMIN)' })
    @Roles('admin')
    @Post('admin')
    createAdmin(dto: CreateUserDto){
        return this.userService.createAdmin(dto)
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Lấy danh sách tất cả người dùng (chỉ Admin)' })
    @ApiResponse({ status: 200, description: 'Danh sách người dùng', type: CreateUserDto })
    @ApiResponse({ status: 401, description: 'Chưa xác thực' })
    @ApiResponse({ status: 403, description: 'Không có quyền (yêu cầu vai trò ADMIN)' })
    @Get()
    getAllUser(){
        return this.userService.getAllUser()
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get(':id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Lấy thông tin người dùng theo ID chỉ Admin' })
    @ApiResponse({ status: 200, description: 'Thông tin người dùng', type: CreateUserDto })
    @ApiResponse({ status: 401, description: 'Chưa xác thực' })
    @ApiResponse({ status: 403, description: 'Không có quyền truy cập' })
    @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng' })
    getUserById(@Param('id', ParseIntPipe) id : number){
        return this.userService.getUserById((id))
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Cập nhật thông tin người dùng (chủ sở hữu hoặc Admin)' })
    @ApiResponse({ status: 200, description: 'Người dùng đã được cập nhật', type: CreateUserDto })
    @ApiResponse({ status: 401, description: 'Chưa xác thực' })
    @ApiResponse({ status: 403, description: 'Không có quyền truy cập' })
    @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng' })
    @Put(':id')
    updateUserById(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto){
        return this.userService.updateUser(id, dto)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Cập nhật thông tin người dùng (chủ sở hữu hoặc Admin)' })
    @ApiResponse({ status: 200, description: 'Người dùng đã được cập nhật', type: CreateUserDto })
    @ApiResponse({ status: 401, description: 'Chưa xác thực' })
    @ApiResponse({ status: 403, description: 'Không có quyền truy cập' })
    @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng' })
    @Put()
    updateUser(@Request() req, @Body() dto: UpdateUserDto){
        return this.userService.updateUser(req.user.id, dto)
    }


    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'phân quyền (chỉ Admin)' })
    @ApiResponse({ status: 200, description: 'Danh sách người dùng', type: CreateUserDto })
    @ApiResponse({ status: 401, description: 'Chưa xác thực' })
    @ApiResponse({ status: 403, description: 'Không có quyền (yêu cầu vai trò ADMIN)' })
    @Get()
    updateUserRole(@Body('id', ParseIntPipe) id: number, @Body('email') email: string){
        const identifier = id ? { id } : { email };
        return this.userService.updateUserRole(identifier)
    }

    @UseGuards(JwtAuthGuard, OwnershipGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Xóa người dùng (chủ sở hữu hoặc Admin)' })
    @ApiResponse({ status: 200, description: 'Người dùng đã được xóa'})
    @ApiResponse({ status: 401, description: 'Chưa xác thực' })
    @ApiResponse({ status: 403, description: 'Không có quyền truy cập' })
    @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng' })
    @Delete(':id')
    deleteUser(@Param('id', ParseIntPipe) id: number){
        return this.userService.deleteUser((id))
    }
    


}