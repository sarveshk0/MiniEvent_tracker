import { PrismaService } from '../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import { BaseRepository } from '../common/repositories/base.repository';
export declare class UsersRepository extends BaseRepository<User, Prisma.UserCreateInput, Prisma.UserUpdateInput, Prisma.UserWhereUniqueInput, Prisma.UserWhereInput, Prisma.UserOrderByWithRelationInput> {
    constructor(prisma: PrismaService);
}
