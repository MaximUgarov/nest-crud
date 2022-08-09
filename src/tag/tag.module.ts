import { AuthModule } from './../auth/auth.module';
import { UserModule } from './../user/user.module';
import { User } from 'src/user/entities/user.entity';
import { Module, forwardRef } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tag } from './entities/tag.entity';

@Module({
  imports: [SequelizeModule.forFeature([Tag, User]), forwardRef(() => UserModule), AuthModule],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService]
})
export class TagModule { }
