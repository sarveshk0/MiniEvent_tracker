import { EventsService } from './events.service';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(req: any, createEventDto: CreateEventDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        dateTime: Date;
        location: string;
        shareToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    findAll(req: any, type?: 'upcoming' | 'past', page?: string, limit?: string): Promise<{
        events: import(".prisma/client").Event[];
        total: number;
    }>;
    findByToken(token: string): Promise<{
        id: number;
        title: string;
        description: string | null;
        dateTime: Date;
        location: string;
        shareToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    findOne(id: string): Promise<{
        id: number;
        title: string;
        description: string | null;
        dateTime: Date;
        location: string;
        shareToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    update(req: any, id: string, updateEventDto: UpdateEventDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        dateTime: Date;
        location: string;
        shareToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
    remove(req: any, id: string): Promise<{
        id: number;
        title: string;
        description: string | null;
        dateTime: Date;
        location: string;
        shareToken: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: number;
    }>;
}
