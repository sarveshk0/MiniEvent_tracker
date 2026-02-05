import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Event, Prisma } from '@prisma/client';
import { BaseRepository } from '../common/repositories/base.repository';

@Injectable()
export class EventsRepository extends BaseRepository<
  Event,
  Prisma.EventCreateInput,
  Prisma.EventUpdateInput,
  Prisma.EventWhereUniqueInput,
  Prisma.EventWhereInput,
  Prisma.EventOrderByWithRelationInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, 'event');
  }

  // Specialized overrides to always include the user
  override async findUnique(
    where: Prisma.EventWhereUniqueInput,
  ): Promise<Event | null> {
    return super.findUnique(where, {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    });
  }

  override async findMany(params: {
    skip?: number;
    take?: number;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput;
  }): Promise<Event[]> {
    return super.findMany({
      ...params,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  }
}
