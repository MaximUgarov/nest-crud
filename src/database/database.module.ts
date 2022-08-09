import { UniqueValidator } from './unique.decorator';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';



@Module({
    imports: [SequelizeModule.forRoot({
        dialect: "postgres",
        database: "test",
        username: "postgres",
        password: "1212",
        host: "localhost",
        port: 5432,
        logQueryParameters: true,
        benchmark: true,
        logging: false,
        pool: { "max": 20 },
        models: [],
        autoLoadModels: true,
        synchronize: true,
        sync: { force: false },
    })],
    providers: [UniqueValidator],
})
export class DatabaseModule { }
