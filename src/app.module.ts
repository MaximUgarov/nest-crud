import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [DatabaseModule, UserModule, TagModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, DatabaseModule],
})
export class AppModule { }
