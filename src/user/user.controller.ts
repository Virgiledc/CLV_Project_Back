import { Controller, Delete, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Body, Param } from '@nestjs/common';
import { UserCreateDto } from './user.model';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers() {
        const users = await this.userService.getAllUsers();
        return users
    }
    @Get(':name')
    async getUser(@Param('name') name: string) {
        return this.userService.getUser(name);
    }
    @Post()
    async insertUser(@Body() userCreateDto: UserCreateDto) {
        return this.userService.insertUser(userCreateDto.name, userCreateDto.email, userCreateDto.password);
    }
    // delete user
    @Delete(':name')
    async deleteUser(@Param('name') name: string) {
        return this.userService.deleteUser(name);
    }
}
