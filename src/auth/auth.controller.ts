import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { UserConnect } from '../user/user.model';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Body() userCreateDto: UserConnect) {
      return this.authService.login(userCreateDto);
    }
    
}
