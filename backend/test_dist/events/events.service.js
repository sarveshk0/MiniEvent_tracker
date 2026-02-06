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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const events_repository_1 = require("./events.repository");
let EventsService = class EventsService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(userId, data) {
        const { dateTime, ...rest } = data;
        return this.repository.create({
            ...rest,
            dateTime: new Date(dateTime),
            user: { connect: { id: userId } },
        });
    }
    async findAll(userId, query) {
        const { type, page = 1, limit = 10 } = query;
        const skip = (page - 1) * limit;
        const where = {
            userId: userId,
        };
        if (type === 'upcoming') {
            where.dateTime = { gte: new Date() };
        }
        else if (type === 'past') {
            where.dateTime = { lt: new Date() };
        }
        const [events, total] = await Promise.all([
            this.repository.findMany({
                where,
                skip,
                take: limit,
                orderBy: { dateTime: 'asc' },
            }),
            this.repository.count(where),
        ]);
        return { events, total };
    }
    async findOne(id) {
        const event = await this.repository.findUnique({ id });
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        return event;
    }
    async findByToken(shareToken) {
        const event = await this.repository.findUnique({ shareToken });
        if (!event)
            throw new common_1.NotFoundException('Event not found');
        return event;
    }
    async update(userId, id, data) {
        const event = await this.findOne(id);
        if (event.userId !== userId) {
            throw new common_1.ForbiddenException('You do not own this event');
        }
        if (data.dateTime) {
            data.dateTime = new Date(data.dateTime);
        }
        return this.repository.update({ where: { id }, data });
    }
    async remove(userId, id) {
        const event = await this.findOne(id);
        if (event.userId !== userId) {
            throw new common_1.ForbiddenException('You do not own this event');
        }
        return this.repository.delete({ id });
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [events_repository_1.EventsRepository])
], EventsService);
//# sourceMappingURL=events.service.js.map