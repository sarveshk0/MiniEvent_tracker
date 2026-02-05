import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { AtGuard } from '../auth/guards/at.guard';
import { CreateEventDto, UpdateEventDto } from './dto/event.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(AtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({ status: 201, description: 'Event created successfully' })
  async create(@Req() req: any, @Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(req.user.userId, createEventDto as any);
  }

  @Get()
  @UseGuards(AtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Get all user's events" })
  @ApiQuery({ name: 'type', required: false, enum: ['upcoming', 'past'] })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(
    @Req() req: any,
    @Query('type') type?: 'upcoming' | 'past',
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    return this.eventsService.findAll(req.user.userId, {
      type,
      page: page ? parseInt(page) : 1,
      limit: limit ? parseInt(limit) : 10,
    });
  }

  @Get('share/:token')
  @ApiOperation({ summary: 'Get event by share token (Public)' })
  findByToken(@Param('token') token: string) {
    return this.eventsService.findByToken(token);
  }

  @Get(':id')
  @UseGuards(AtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get specific event' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update event' })
  update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.update(req.user.userId, +id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(AtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete event' })
  remove(@Req() req: any, @Param('id') id: string) {
    return this.eventsService.remove(req.user.userId, +id);
  }
}
