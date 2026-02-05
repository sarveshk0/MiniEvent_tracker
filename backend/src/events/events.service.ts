import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { EventsRepository } from './events.repository';
import { Prisma, Event } from '@prisma/client';

@Injectable()
export class EventsService {
  constructor(private repository: EventsRepository) {}

  async create(userId: number, data: any): Promise<Event> {
    const { dateTime, ...rest } = data;
    return this.repository.create({
      ...rest,
      dateTime: new Date(dateTime),
      user: { connect: { id: userId } },
    } as Prisma.EventCreateInput);
  }

  async findAll(
    userId: number,
    query: {
      type?: 'upcoming' | 'past';
      page?: number;
      limit?: number;
    },
  ): Promise<{ events: Event[]; total: number }> {
    const { type, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where: Prisma.EventWhereInput = {
      userId: userId,
    } as Prisma.EventWhereInput;

    if (type === 'upcoming') {
      (where as any).dateTime = { gte: new Date() };
    } else if (type === 'past') {
      (where as any).dateTime = { lt: new Date() };
    }

    const [events, total] = await Promise.all([
      this.repository.findMany({
        where,
        skip,
        take: limit,
        orderBy: { dateTime: 'asc' },
      }),
      this.repository.count(where),
    ]);

    return { events, total };
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.repository.findUnique({ id });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async findByToken(shareToken: string): Promise<Event> {
    const event = await this.repository.findUnique({ shareToken });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async update(
    userId: number,
    id: number,
    data: Prisma.EventUpdateInput,
  ): Promise<Event> {
    const event = await this.findOne(id);
    if (event.userId !== userId) {
      throw new ForbiddenException('You do not own this event');
    }
    if (data.dateTime) {
      data.dateTime = new Date(data.dateTime as string);
    }
    return this.repository.update({ where: { id }, data });
  }

  async remove(userId: number, id: number): Promise<Event> {
    const event = await this.findOne(id);
    if (event.userId !== userId) {
      throw new ForbiddenException('You do not own this event');
    }
    return this.repository.delete({ id });
  }
}
