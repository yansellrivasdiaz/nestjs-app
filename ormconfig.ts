import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'p@$$w0rd',
    database: 'nestjs-app',
    synchronize: true,
    entities: ['dist/src/**/*.entity.js'],
    migrations:[
        'dist/src/db/migrations/*.js'
    ],
    cli:{
        migrationsDir: 'src/db/migrations'
    }
}

export default config;