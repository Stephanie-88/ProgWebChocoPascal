import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './presentation/users.controller';
import { UsersService } from './application/users.service';
import { UserOrmEntity } from './infrastructure/persistence/typeorm/user.orm-entity';
import { UsersTypeOrmRepository } from './infrastructure/persistence/typeorm/users.typeorm.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserOrmEntity])],
    controllers: [UsersController],
    providers: [
        UsersService,
        {
            provide: 'UsersRepositoryPort',
            useClass: UsersTypeOrmRepository,
        },
    ],
})
export class UsersModule { }
