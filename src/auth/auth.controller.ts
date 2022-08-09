import { LoginUserDto } from './../user/dto/login-user.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { Body, Controller, Get, Header, Headers, HttpCode, Post, HttpStatus } from '@nestjs/common';

@Controller('/')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @Post('/signup')
    signup(@Body() userDto: CreateUserDto) {
        return this.authService.signup(userDto);
    }

    @Post('/login')
    login(@Body() userDto: LoginUserDto) {
        return this.authService.login(userDto);
    }
    @Header('authorization', 'none')
    @Get('/logout')
    @HttpCode(HttpStatus.NO_CONTENT)

    @Get('/refresh')
    refresh(@Headers('authorization') header: string) {
        return this.authService.refresh(header);
    }
}
