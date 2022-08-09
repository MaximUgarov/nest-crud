import { HashService } from './hash.service';
import { Module } from '@nestjs/common';

@Module({
    exports: [HashService],
    providers: [HashService]
})
export class HashModule { }
