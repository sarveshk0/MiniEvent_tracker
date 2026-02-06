"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var KeepAliveService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeepAliveService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../prisma/prisma.service");
let KeepAliveService = KeepAliveService_1 = class KeepAliveService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(KeepAliveService_1.name);
    }
    async handleCron() {
        this.logger.debug('Starting Keep-Alive ping to database...');
        try {
            await this.prisma.$queryRaw `SELECT 1`;
            this.logger.log('Keep-Alive ping successful. Supabase project remains active.');
        }
        catch (error) {
            this.logger.error('Keep-Alive ping failed:', error.message);
        }
    }
    async onModuleInit() {
        this.logger.log('KeepAliveService initialized. Scheduled to run daily.');
    }
};
exports.KeepAliveService = KeepAliveService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KeepAliveService.prototype, "handleCron", null);
exports.KeepAliveService = KeepAliveService = KeepAliveService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KeepAliveService);
//# sourceMappingURL=keep-alive.service.js.map