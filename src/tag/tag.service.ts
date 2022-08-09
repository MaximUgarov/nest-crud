import { IGetTag } from './tag.interface';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { Injectable, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {

  constructor(
    @InjectModel(Tag) private readonly tagRepository: typeof Tag,
    @InjectModel(User) private readonly UserModel: typeof User,
    @Inject(forwardRef(() => UserService))
    private userService: UserService
  ) { }


  async create(createTagDto: CreateTagDto, creator: string) {
    return await this.tagRepository.create({ ...createTagDto, creator });
  }

  async findOne(id: number) {
    const tag = await this.tagRepository.findOne({ raw: true, where: { id } })
    const creator = await this.userService.findByIdAttrebutes(tag.creator, ['uid', 'nickname'])
    return { ...tag, creator }
  }

  async get(queryData: IGetTag) {
    const { page, pageSize: limit } = queryData.meta,
      offset = page * limit - limit
    const order = []
    if (!!queryData.sort?.byOrder) order.push(['sortOrder', 'ASC'])
    if (!!queryData.sort?.byName) order.push(['name', 'ASC'])
    const data = await this.tagRepository.findAndCountAll({ limit, offset, order })
    return {
      data: data.rows,
      meta: {
        page,
        pageSize: limit,
        quantity: data.count
      }
    }
  }

  async update(id: number, creator: string, updateTagDto: UpdateTagDto) {
    const [_, tag] = await this.tagRepository.update(updateTagDto, { where: { id, creator }, returning: true })
    if (tag.length < 0) throw new BadRequestException('tag is undefiend')
    return await this.findOne(tag[0].id)
  }

  async remove(id: number, creator: string) {
    const tag = await this.tagRepository.findOne({ where: { id }, include: [{ model: this.UserModel, required: true, where: { uid: creator } }] })
    if (!tag) throw new BadRequestException('tag is undefiend')
    await tag.destroy()
    return true
  }

}
