import { AttendeesService } from './attendees.service';
export declare class AttendeesController {
    private readonly attendeesService;
    constructor(attendeesService: AttendeesService);
    join(eventId: number, req: any): Promise<{
        id: number;
        userId: number;
        eventId: number;
        joinedAt: Date;
    }>;
    leave(eventId: number, req: any): Promise<{
        id: number;
        userId: number;
        eventId: number;
        joinedAt: Date;
    }>;
}
