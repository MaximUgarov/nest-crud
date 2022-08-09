import { TagService } from './../tag/tag.service';
import { Tag } from 'src/tag/entities/tag.entity';
import { LoginUserDto } from './dto/login-user.dto';
import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
    @InjectModel(Tag) private readonly TagModel: typeof Tag,
    @Inject(forwardRef(() => TagService))
    private tagService: TagService) { }

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create({ ...createUserDto }, { raw: true });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email }, raw: true });
  }

  async findByNickname(nickname: string) {
    return await this.userRepository.findOne({ where: { nickname }, raw: true });
  }

  async findById(id: string) {
    const { email, nickname, tags } = await this.userRepository.findByPk(id, { include: { all: true }, raw: true })
    return { email, nickname, tags }
  }

  async findOneOrNull(useDto: LoginUserDto) {
    try {
      return await this.userRepository.findOne({ where: { useDto }, raw: true })
    } catch (error) {
      return false
    }
  }

  async findAllTags(uid: string) {
    return await this.userRepository.findByPk(uid, { include: [{ model: this.TagModel, as: 'tags', }], attributes: [], raw: true })
  }

  async findByIdAttrebutes(uid: string, attributes: Array<string>) {
    return await this.userRepository.findByPk(uid, { attributes, raw: true })
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const [_, user] = await this.userRepository.update(updateUserDto, { where: { id }, returning: true })
    if (user.length < 0 || !user[0]) throw new BadRequestException('user is undefiend')
    return { email: user[0].email, nickname: user[0].nickname }
  }

  async remove(id: string) {
    await this.userRepository.destroy({ where: { id } })
    return true
  }

  async removeTag(tagId: number, uid: string) {
    await this.tagService.remove(tagId, uid)
    return await this.findAllTags(uid)
  }

  async addTags(tagIds: Array<number>, uid: string) {
    for (const id of tagIds) {
      const tag = await this.tagService.findOne(id)
      if (!tag) throw new BadRequestException(`tag with ${id} is undefiend`)
    }
    for (const id of tagIds) {
      const tag = await this.tagService.findOne(id)
      await this.tagService.create({ name: tag.name, sortOrder: +tag.sortOrder }, uid)
    }
    return await this.findAllTags(uid)
  }

}
