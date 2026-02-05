import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { EventsRepository } from './events.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EventsController],
  providers: [EventsService, EventsRepository],
  exports: [EventsService, EventsRepository],
})
export class EventsModule {}
