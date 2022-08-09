import { BelongsTo, Column, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { User } from "src/user/entities/user.entity";

@Table({
    timestamps: false,
})
export class Tag extends Model {
    @Column(DataTypes.STRING(40))
    name: string
    @Default(0)
    @Column(DataTypes.INTEGER)
    sortOrder: string
    @ForeignKey(() => User)
    @Column(DataTypes.UUID)
    creator: string
    @BelongsTo(() => User, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        hooks: true
    })
    user: User
}
