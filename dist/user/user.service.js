"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAllUser() {
        return await this.prisma.user.findMany();
    }
    async getUserById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });
        if (!user) {
            throw new common_1.NotFoundException(`not found user: ${id}`);
        }
        return user;
    }
    async updateUser(id, dto) {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });
        if (!user) {
            throw new common_1.NotFoundException(`Not found user: ${id}`);
        }
        return await this.prisma.user.update({
            where: { id },
            data: dto
        });
    }
    async deleteUser(id) {
        const user = await this.prisma.user.findUnique({
            where: { id }
        });
        if (!user) {
            throw new common_1.NotFoundException(`Not found user: ${id}`);
        }
        return await this.prisma.user.delete({
            where: { id }
        });
    }
    async createAdmin(dto) {
        const existingUser = await this.prisma.user.findUnique({ where: { email: dto.email } });
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        const hasedPassword = await bcrypt.hash(dto.password, 10);
        return await this.prisma.user.create({
            data: {
                ...dto,
                password: hasedPassword,
                role: 'admin'
            }
        });
    }
    async updateUserRole(identifier) {
        const user = await this.prisma.user.findUnique({
            where: identifier
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return await this.prisma.user.update({
            where: { id: user.id },
            data: { role: "admin" },
        });
    }
    async getPass() {
        const adminPass = await bcrypt.hash("admin123", 10);
        const pass2 = await bcrypt.hash("passwordUser1", 10);
        const pass3 = await bcrypt.hash("passwordUser2", 10);
        const pass4 = await bcrypt.hash("passwordUser3", 10);
        console.log(adminPass);
        console.log(pass2);
        console.log(pass3);
        console.log(pass4);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map