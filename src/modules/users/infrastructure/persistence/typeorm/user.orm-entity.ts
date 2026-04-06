import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class UserOrmEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 120 })
    name: string;

    @Column({ unique: true, length: 160 })
    email: string;

    @Column({ default: true })
    isActive: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

