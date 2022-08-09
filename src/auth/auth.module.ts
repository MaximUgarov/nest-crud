import { AuthGuard } from 'src/auth/auth.guard';
import { HashModule } from './../hash/hash.module';
import { UserModule } from './../user/user.module';
import { JWT_OPTIONS } from './../shared/constants/index';
import { JwtModule } from '@nestjs/jwt';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, AuthGuard],
  exports: [AuthService, JwtModule, AuthGuard],
  controllers: [AuthController],
  imports: [forwardRef(() => UserModule), JwtModule.register({
    secret: JWT_OPTIONS.secret,
    signOptions: { expiresIn: JWT_OPTIONS.expiresIn }
  }), HashModule]
})
export class AuthModule { }
