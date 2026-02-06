import { EventsRepository } from './events.repository';
import { Prisma, Event } from '@prisma/client';
export declare class EventsService {
    private repository;
    constructor(repository: EventsRepository);
    create(userId: number, data: any): Promise<Event>;
    findAll(userId: number, query: {
        type?: 'upcoming' | 'past';
        page?: number;
        limit?: number;
    }): Promise<{
        events: Event[];
        total: number;
    }>;
    findOne(id: number): Promise<Event>;
    findByToken(shareToken: string): Promise<Event>;
    update(userId: number, id: number, data: Prisma.EventUpdateInput): Promise<Event>;
    remove(userId: number, id: number): Promise<Event>;
}
