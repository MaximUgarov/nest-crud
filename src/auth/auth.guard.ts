import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtTokenService: JwtService, private readonly userService: UserService) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization
            const bearer = authHeader.split` `[0]
            const token = authHeader.split` `[1]
            if (bearer !== 'Bearer' || !token) throw new UnauthorizedException('user is not authorized')
            const payload = await this.jwtTokenService.verifyAsync(token)
            const candidate = await this.userService.findById(payload.uid)
            if (!candidate) throw new UnauthorizedException('user is not authorized')
            req.user = payload
            return true
        } catch (error) {
            throw new UnauthorizedException('user is not authorized')
        }
    }
}