import { User } from 'src/user/entities/user.entity';
import { UniqueValidator } from '../../database/unique.decorator';
import { IsEmail, IsNotEmpty, MaxLength, IsString, Validate } from 'class-validator';


export class CreateUserDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(100)
    @Validate(UniqueValidator, [User])
    email: string;
    @IsString()
    @IsNotEmpty()
    password: string;
    @IsString()
    @IsNotEmpty()
    @MaxLength(30)
    @Validate(UniqueValidator, [User])
    nickname: string
}
