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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const jwt_config_1 = require("../common/configs/jwt.config");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findOne(email);
        if (user && (await bcrypt.compare(pass, user.passwordHash))) {
            const { passwordHash, refreshTokens, ...result } = user;
            return result;
        }
        return null;
    }
    async login(user) {
        const tokens = await this.getTokens(user.id, user.email, user.role);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }
    async register(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.usersService.create({
            email: data.email,
            name: data.name,
            passwordHash: hashedPassword,
        });
        return this.login(user);
    }
    async logout(userId) {
        await this.usersService.update(userId, {
            refreshTokens: [],
        });
    }
    async refresh(userId, rt) {
        const user = await this.usersService.findById(userId);
        if (!user || !user.refreshTokens.length)
            throw new common_1.ForbiddenException('Access Denied');
        const tokenMatches = await Promise.all(user.refreshTokens.map(async (storedHash) => await bcrypt.compare(rt, storedHash)));
        if (!tokenMatches.some((m) => m))
            throw new common_1.ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.email, user.role);
        await this.updateRtHash(user.id, tokens.refresh_token);
        return tokens;
    }
    async updateRtHash(userId, rt) {
        const hash = await bcrypt.hash(rt, 10);
        const user = await this.usersService.findById(userId);
        if (!user)
            return;
        await this.usersService.update(userId, {
            refreshTokens: [hash],
        });
    }
    async getTokens(userId, email, role) {
        const [at, rt] = await Promise.all([
            this.jwtService.signAsync({ sub: userId, email, role }, {
                secret: jwt_config_1.jwtConfig.secret,
                expiresIn: jwt_config_1.jwtConfig.expiresIn,
            }),
            this.jwtService.signAsync({ sub: userId, email, role }, {
                secret: jwt_config_1.jwtConfig.refreshSecret,
                expiresIn: jwt_config_1.jwtConfig.refreshExpiresIn,
            }),
        ]);
        return {
            access_token: at,
            refresh_token: rt,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map