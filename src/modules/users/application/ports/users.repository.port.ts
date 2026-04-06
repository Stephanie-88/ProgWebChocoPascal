import { User } from '../../domain/user';

export interface UsersRepositoryPort {
  create(user: User): Promise<User>;
  findById(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<void>;
}
