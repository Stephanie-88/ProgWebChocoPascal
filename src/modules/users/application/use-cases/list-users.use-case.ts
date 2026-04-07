import { Inject, Injectable } from '@nestjs/common';
import type { UsersRepositoryPort } from '../ports/users.repository.port';
import { User } from '../../domain/user';

@Injectable()
export class ListUsersUseCase {
    constructor(
        @Inject('UsersRepositoryPort')
        private readonly usersRepo: UsersRepositoryPort,
    ) { }

    async execute(): Promise<User[]> {
        return this.usersRepo.findAll();
    }
}
