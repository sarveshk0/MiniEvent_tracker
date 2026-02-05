import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}

  async findOne(email: string): Promise<User | null> {
    return this.repository.findUnique({ email });
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findUnique({ id });
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.repository.create(data);
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.repository.update({
      where: { id },
      data,
    });
  }
}
