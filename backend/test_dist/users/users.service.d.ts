import { UsersRepository } from './users.repository';
import { User, Prisma } from '@prisma/client';
export declare class UsersService {
    private repository;
    constructor(repository: UsersRepository);
    findOne(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    update(id: number, data: Prisma.UserUpdateInput): Promise<User>;
}
