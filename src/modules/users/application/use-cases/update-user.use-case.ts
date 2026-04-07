import { Inject, Injectable } from '@nestjs/common';
import type { UsersRepositoryPort } from '../ports/users.repository.port';
import { User } from '../../domain/user';
import { UserNotFoundException, EmailAlreadyInUseException } from '../../domain/exceptions/user.exceptions';
import { UpdateUserDto } from '../../presentation/dto/update-user.dto';

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject('UsersRepositoryPort')
        private readonly usersRepo: UsersRepositoryPort,
    ) { }

    async execute(id: number, dto: UpdateUserDto): Promise<User> {
        const user = await this.usersRepo.findById(id);
        if (!user) throw new UserNotFoundException(id);

        if (dto.name) user.name = dto.name.trim();

        if (dto.email && dto.email.toLowerCase() !== user.email.toLowerCase()) {
            const existing = await this.usersRepo.findByEmail(dto.email);
            if (existing) throw new EmailAlreadyInUseException(dto.email);
            user.email = dto.email.trim().toLowerCase();
        }

        return this.usersRepo.update(user);
    }
}
