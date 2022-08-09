import { Model } from 'sequelize-typescript';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { Constructor } from 'sequelize-typescript/dist/shared/types';
import { Injectable } from '@nestjs/common';

type ModelType<T extends Model<T>> = Constructor<T> & typeof Model;
interface UniqueValidationArguments<E> extends ValidationArguments {
    constraints: [
        ModelType<Model>,
        string,
    ];
}
@ValidatorConstraint({ name: 'isUniqueField', async: true })
@Injectable()
export class UniqueValidator implements ValidatorConstraintInterface {
    public async validate<E>(value: string, args: UniqueValidationArguments<E>) {
        const [EntityModel, findCondition = args.property] = args.constraints;
        return (
            (await EntityModel.findAndCountAll({
                where: { [findCondition]: value },
            })).count <= 0
        );
    }

    public defaultMessage(args: ValidationArguments) {
        const [EntityModel] = args.constraints;
        const entity = EntityModel.name || 'Entity';
        return `${entity} with the same '${args.property}' already exist`;
    }
}