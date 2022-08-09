import { Transform } from "class-transformer";
import { IsNumber } from "class-validator";


export class GetTagQuery {
    sortByOrder: boolean = true;
    sortByName: boolean = true;
    @IsNumber()
    @Transform(page => parseInt(page.value), { toClassOnly: true })
    page: number = 1;
    @IsNumber()
    @Transform(pageSize => parseInt(pageSize.value), { toClassOnly: true })
    pageSize: number = 5
}
