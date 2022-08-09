import { AuthGuard } from 'src/auth/auth.guard';
import { TagModule } from './../tag/tag.module';
import { Tag } from 'src/tag/entities/tag.entity';
import { AuthModule } from './../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';


@Module({
  imports: [SequelizeModule.forFeature([User, Tag]), forwardRef(() => AuthModule), TagModule],
  controllers: [UserController],
  providers: [UserService, AuthGuard],
  exports: [UserService],
})
export class UserModule { }
