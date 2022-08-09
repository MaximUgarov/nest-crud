import { UniqueValidator } from './../../database/unique.decorator';
import { IsNotEmpty, IsNumber, IsString, MaxLength, Validate } from "class-validator";
import { Tag } from '../entities/tag.entity';
import { Transform } from 'class-transformer';

export class CreateTagDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(40)
    @Validate(UniqueValidator, [Tag])
    name: string;
    @Transform(sortOrder => parseInt(sortOrder.value), { toClassOnly: true })
    @IsNumber()
    sortOrder: number;
}
