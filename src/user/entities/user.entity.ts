import { AllowNull, Column, Default, HasMany, Model, PrimaryKey, Table} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Injectable } from '@nestjs/common';
import { Tag } from "src/tag/entities/tag.entity";


@Table({
    timestamps: false,
})
@Injectable()
export class User extends Model {

    @AllowNull(false)
    @Default(DataTypes.UUIDV1)
    @PrimaryKey
    @Column(DataTypes.UUID)
    uid: string;
    @AllowNull(false)
    @Column(DataTypes.STRING(100))
    email: string;
    @AllowNull(false)
    @Column({
        type: DataTypes.STRING,
        set(password: string) {
            this.setDataValue('password', password)
        }
    })
    password: string;
    @AllowNull(false)
    @Column({
        type: DataTypes.STRING(30),
    })
    nickname: string;
    @HasMany(() => Tag)
    tags: Tag[]
}

