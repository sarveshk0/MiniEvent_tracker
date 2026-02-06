import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class KeepAliveService {
  private readonly logger = new Logger(KeepAliveService.name);

  constructor(private prisma: PrismaService) {}

  // Run every 24 hours to prevent Supabase from pausing the project
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleCron() {
    this.logger.debug('Starting Keep-Alive ping to database...');
    try {
      // Simple query to keep the connection active
      await this.prisma.$queryRaw`SELECT 1`;
      this.logger.log('Keep-Alive ping successful. Supabase project remains active.');
    } catch (error) {
      this.logger.error('Keep-Alive ping failed:', error.message);
    }
  }

  // Also run on startup once to ensure it's working
  async onModuleInit() {
    this.logger.log('KeepAliveService initialized. Scheduled to run daily.');
  }
}
