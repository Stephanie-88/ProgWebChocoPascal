import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import type { UsersRepositoryPort } from './ports/users.repository.port';
import { User } from '../domain/user';
import { UpdateUserDto } from '../presentation/dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @Inject('UsersRepositoryPort')
        private readonly usersRepo: UsersRepositoryPort,
    ) { }


    async create(name: string, email: string): Promise<User> {
        if (!email) throw new BadRequestException('Email é obrigatório');
        if (!name) throw new BadRequestException('Nome é obrigatório');
        const existing = await this.usersRepo.findByEmail(email);
        if (existing) throw new BadRequestException('E-mail já cadastrado');

        const user = new User(null, name.trim(), email.trim().toLowerCase(), true);
        return this.usersRepo.create(user);
    }

    async findAll(): Promise<User[]> {
        return this.usersRepo.findAll();
    }

    async findById(id: number): Promise<User> {
        const user = await this.usersRepo.findById(id);
        if (!user) throw new NotFoundException('Usuário não encontrado');
        return user;
    }

    async update(id: number, dto: UpdateUserDto): Promise<User> {
        const user = await this.findById(id);

        if (dto.name) user.name = dto.name.trim();

        if (dto.email && dto.email.toLowerCase() !== user.email.toLowerCase()) {
            const existing = await this.usersRepo.findByEmail(dto.email);
            if (existing) throw new BadRequestException('E-mail já cadastrado');
            user.email = dto.email.trim().toLowerCase();
        }

        return this.usersRepo.update(user);
    }

    async deactivate(id: number): Promise<User> {
        const user = await this.findById(id);

        user.isActive = false;
        return this.usersRepo.update(user);
    }

    async delete(id: number): Promise<User> {
        const user = await this.findById(id);
        await this.usersRepo.delete(id);
        return user;
    }
}
