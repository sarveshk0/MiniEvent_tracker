import {
  Controller,
  Post,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { AtGuard } from '../auth/guards/at.guard';

@Controller('events/:eventId/attendees')
export class AttendeesController {
  constructor(private readonly attendeesService: AttendeesService) {}

  @UseGuards(AtGuard)
  @Post()
  join(@Param('eventId', ParseIntPipe) eventId: number, @Request() req: any) {
    return this.attendeesService.joinEvent(req.user.userId, eventId);
  }

  @UseGuards(AtGuard)
  @Delete()
  leave(@Param('eventId', ParseIntPipe) eventId: number, @Request() req: any) {
    return this.attendeesService.leaveEvent(req.user.userId, eventId);
  }
}
