import { PrismaService } from '../prisma/prisma.service';
import { Event, Prisma } from '@prisma/client';
import { BaseRepository } from '../common/repositories/base.repository';
export declare class EventsRepository extends BaseRepository<Event, Prisma.EventCreateInput, Prisma.EventUpdateInput, Prisma.EventWhereUniqueInput, Prisma.EventWhereInput, Prisma.EventOrderByWithRelationInput> {
    constructor(prisma: PrismaService);
    findUnique(where: Prisma.EventWhereUniqueInput): Promise<Event | null>;
    findMany(params: {
        skip?: number;
        take?: number;
        where?: Prisma.EventWhereInput;
        orderBy?: Prisma.EventOrderByWithRelationInput;
    }): Promise<Event[]>;
}
