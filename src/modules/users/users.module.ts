import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './presentation/users.controller';
import { UserOrmEntity } from './infrastructure/persistence/typeorm/user.orm-entity';
import { UsersTypeOrmRepository } from './infrastructure/persistence/typeorm/users.typeorm.repository';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { ListUsersUseCase } from './application/use-cases/list-users.use-case';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use-case';
import { UpdateUserUseCase } from './application/use-cases/update-user.use-case';
import { DeactivateUserUseCase } from './application/use-cases/deactivate-user.use-case';
import { DeleteUserUseCase } from './application/use-cases/delete-user.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([UserOrmEntity])],
    controllers: [UsersController],
    providers: [
        CreateUserUseCase,
        ListUsersUseCase,
        FindUserByIdUseCase,
        UpdateUserUseCase,
        DeactivateUserUseCase,
        DeleteUserUseCase,
        {
            provide: 'UsersRepositoryPort',
            useClass: UsersTypeOrmRepository,
        },
    ],
})
export class UsersModule { }
