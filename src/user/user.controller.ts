import { GetUser } from './dto/user.dto';
import { Controller, Get, Body, Param, Delete, UseGuards, Put, Header, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @UseGuards(AuthGuard)
  findAll(@User() { uid }: GetUser) {
    return this.userService.findById(uid);
  }

  @Get('/tag/my')
  @UseGuards(AuthGuard)
  findAllTags(@User() { uid }: GetUser) {
    return this.userService.findAllTags(uid);
  }

  @Put()
  @UseGuards(AuthGuard)
  update(@User() { uid }: GetUser, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(uid, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard)
  @Header('authorization', 'none')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@User() { uid }: GetUser) {
    return this.userService.remove(uid);
  }

  @Delete('/tag/:id')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTag(@Param('id') tagId: string, @User() { uid }: GetUser) {
    return this.userService.removeTag(+tagId, uid);
  }

}
