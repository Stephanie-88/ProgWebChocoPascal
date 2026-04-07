import { Inject, Injectable } from '@nestjs/common';
import type { UsersRepositoryPort } from '../ports/users.repository.port';
import { User } from '../../domain/user';
import { UserNotFoundException } from '../../domain/exceptions/user.exceptions';

@Injectable()
export class DeactivateUserUseCase {
    constructor(
        @Inject('UsersRepositoryPort')
        private readonly usersRepo: UsersRepositoryPort,
    ) { }

    async execute(id: number): Promise<User> {
        const user = await this.usersRepo.findById(id);
        if (!user) throw new UserNotFoundException(id);

        user.isActive = false;
        return this.usersRepo.update(user);
    }
}
