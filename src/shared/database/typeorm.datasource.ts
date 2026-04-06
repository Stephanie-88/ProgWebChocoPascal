import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { UserOrmEntity } from '../../modules/users/infrastructure/persistence/typeorm/user.orm-entity';

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'data/app.db',
    entities: [UserOrmEntity],
    synchronize: true,
});
