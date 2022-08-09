import { LoginUserDto } from './../user/dto/login-user.dto';
import { HashService } from './../hash/hash.service';
import { CreateUserDto } from './../user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { JWT_OPTIONS } from './../shared/constants/index';
import { JwtService } from '@nestjs/jwt';
import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { IGenerateToken } from './auth.interface';


@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService, private readonly jwtTokenService: JwtService, private readonly hashService: HashService) { }

    private generateToken({ uid, email, nickname }: IGenerateToken) {
        return {
            token: this.jwtTokenService.sign({ uid, email, nickname }),
            expire: JWT_OPTIONS.expiresIn
        }
    }

    private async validateUser(userDto: LoginUserDto) {
        const candidate = await this.userService.findByEmail(userDto.email)
        if (!candidate) throw new HttpException('user with this email is undefiend', HttpStatus.BAD_REQUEST)
        const passwordEquals = this.hashService.comparePassword(userDto.password, candidate.password)
        if (candidate && passwordEquals) return candidate
        throw new UnauthorizedException('password or Email not valid')
    }

    private getTokenFromHeaders(authHeader: string) {
        const token: string = authHeader.split(' ')[1]
        if (!token) return false
        return token
    }

    async signup(userDto: CreateUserDto) {
        const hashedPassword = this.hashService.hashPassword(userDto.password)
        const user = await this.userService.create({ ...userDto, password: hashedPassword })
        return this.generateToken(user)
    }

    async login(userDto: LoginUserDto) {
        return this.generateToken(await this.validateUser(userDto))
    }

    async refresh(header: string) {
        try {
            const tokenVerify = this.getTokenFromHeaders(header)
            if (!tokenVerify) throw new UnauthorizedException('user is not authorized')
            const payload: LoginUserDto = await this.jwtTokenService.verifyAsync(tokenVerify)
            if (!payload) throw new UnauthorizedException('user is not authorized')
            const user = await this.userService.findByEmail(payload.email)
            if (!user) throw new UnauthorizedException('user is not authorized')
            return this.generateToken(user)
        } catch (error) {
            throw new UnauthorizedException('user is not authorized')
        }
    }
}
