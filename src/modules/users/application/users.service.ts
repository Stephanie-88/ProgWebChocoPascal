import { Inject, Injectable } from '@nestjs/common';
import type { UsersRepositoryPort } from './ports/users.repository.port';
import { User } from '../domain/user';

@Injectable()
export class UsersService {
    constructor(
        @Inject('UsersRepositoryPort')
        private readonly usersRepo: UsersRepositoryPort,
    ) { }


    async create(name: string, email: string): Promise<User> {
        const existing = await this.usersRepo.findByEmail(email);
        if (existing) throw new Error('E-mail já cadastrado');

        const user = new User(null, name.trim(), email.trim().toLowerCase(), true);
        return this.usersRepo.create(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepo.findAll();
    }

    async findById(id: number): Promise<User | null> {
        return this.usersRepo.findById(id);
    }

    async deactivate(id: number): Promise<User> {
        const user = await this.usersRepo.findById(id);
        if (!user) throw new Error('Usuário não encontrado');

        user.isActive = false;
        return this.usersRepo.update(user);
    }

    async delete(id: number): Promise<void> {
        await this.usersRepo.delete(id);
    }
}
