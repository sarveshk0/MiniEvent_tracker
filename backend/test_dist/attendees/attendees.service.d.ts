import { PrismaService } from '../prisma/prisma.service';
import { Attendee } from '@prisma/client';
export declare class AttendeesService {
    private prisma;
    constructor(prisma: PrismaService);
    joinEvent(userId: number, eventId: number): Promise<Attendee>;
    leaveEvent(userId: number, eventId: number): Promise<Attendee>;
}
