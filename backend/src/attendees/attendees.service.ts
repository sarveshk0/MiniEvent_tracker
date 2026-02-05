import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Attendee } from '@prisma/client';

@Injectable()
export class AttendeesService {
  constructor(private prisma: PrismaService) {}

  async joinEvent(userId: number, eventId: number): Promise<Attendee> {
    const existing = await this.prisma.attendee.findUnique({
      where: { userId_eventId: { userId, eventId } },
    });

    if (existing) {
      throw new ConflictException('User already joined this event');
    }

    return this.prisma.attendee.create({
      data: {
        userId,
        eventId,
      },
    });
  }

  async leaveEvent(userId: number, eventId: number): Promise<Attendee> {
    // Check existence handled by Prisma delete error or we can find first.
    // For simplicity, we try deleting.
    return this.prisma.attendee.delete({
      where: {
        userId_eventId: { userId, eventId },
      },
    });
  }
}
