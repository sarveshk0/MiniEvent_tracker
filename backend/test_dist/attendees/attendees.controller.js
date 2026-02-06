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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendeesController = void 0;
const common_1 = require("@nestjs/common");
const attendees_service_1 = require("./attendees.service");
const at_guard_1 = require("../auth/guards/at.guard");
let AttendeesController = class AttendeesController {
    constructor(attendeesService) {
        this.attendeesService = attendeesService;
    }
    join(eventId, req) {
        return this.attendeesService.joinEvent(req.user.userId, eventId);
    }
    leave(eventId, req) {
        return this.attendeesService.leaveEvent(req.user.userId, eventId);
    }
};
exports.AttendeesController = AttendeesController;
__decorate([
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AttendeesController.prototype, "join", null);
__decorate([
    (0, common_1.UseGuards)(at_guard_1.AtGuard),
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Param)('eventId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AttendeesController.prototype, "leave", null);
exports.AttendeesController = AttendeesController = __decorate([
    (0, common_1.Controller)('events/:eventId/attendees'),
    __metadata("design:paramtypes", [attendees_service_1.AttendeesService])
], AttendeesController);
//# sourceMappingURL=attendees.controller.js.map