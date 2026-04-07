import { Inject, Injectable } from '@nestjs/common';
import type { UsersRepositoryPort } from '../ports/users.repository.port';
import { User } from '../../domain/user';
import { EmailAlreadyInUseException } from '../../domain/exceptions/user.exceptions';

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject('UsersRepositoryPort')
        private readonly usersRepo: UsersRepositoryPort,
    ) { }

    async execute(name: string, email: string): Promise<User> {
        if (!email) throw new Error('Email é obrigatório');
        if (!name) throw new Error('Nome é obrigatório');
        
        const existing = await this.usersRepo.findByEmail(email);
        if (existing) throw new EmailAlreadyInUseException(email);

        const user = new User(null, name.trim(), email.trim().toLowerCase(), true);
        return this.usersRepo.create(user);
    }
}
