import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersRepositoryPort } from '../../../application/ports/users.repository.port';
import { User } from '../../../domain/user';
import { UserOrmEntity } from './user.orm-entity';

@Injectable()
export class UsersTypeOrmRepository implements UsersRepositoryPort {
    constructor(
        @InjectRepository(UserOrmEntity)
        private readonly repo: Repository<UserOrmEntity>,
    ) { }

    async create(user: User): Promise<User> {
        const orm = this.repo.create({
            name: user.name,
            email: user.email,
            isActive: user.isActive,
        });
        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }

    async findById(id: number): Promise<User | null> {
        const found = await this.repo.findOneBy({ id });
        return found ? this.toDomain(found) : null;
    }

    async findAll(): Promise<User[]> {
        const items = await this.repo.find({ order: { id: 'DESC' } });
        return items.map(this.toDomain);
    }

    async findByEmail(email: string): Promise<User | null> {
        const found = await this.repo.findOneBy({ email });
        return found ? this.toDomain(found) : null;
    }

    async update(user: User): Promise<User> {
        const orm = await this.repo.findOneBy({ id: user.id! });
        if (!orm) throw new Error('User not found');

        orm.name = user.name;
        orm.email = user.email;
        orm.isActive = user.isActive;

        const saved = await this.repo.save(orm);
        return this.toDomain(saved);
    }

    async delete(id: number): Promise<void> {
        await this.repo.delete({ id });
    }

    private toDomain = (orm: UserOrmEntity): User => {
        return new User(orm.id, orm.name, orm.email, orm.isActive, orm.createdAt, orm.updatedAt);
    };
}
