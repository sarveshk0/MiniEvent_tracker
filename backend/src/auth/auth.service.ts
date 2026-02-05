import { Injectable, ForbiddenException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/auth.dto';
import { jwtConfig } from '../common/configs/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      const { passwordHash, refreshTokens, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async register(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.usersService.create({
      email: data.email,
      name: data.name,
      passwordHash: hashedPassword,
    });
    return this.login(user);
  }

  async logout(userId: number) {
    await this.usersService.update(userId, {
      refreshTokens: [], // Clear all sessions
    });
  }

  async refresh(userId: number, rt: string) {
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshTokens.length)
      throw new ForbiddenException('Access Denied');

    const tokenMatches = await Promise.all(
      user.refreshTokens.map(
        async (storedHash) => await bcrypt.compare(rt, storedHash),
      ),
    );

    if (!tokenMatches.some((m) => m))
      throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await bcrypt.hash(rt, 10);
    const user = await this.usersService.findById(userId);
    if (!user) return;

    await this.usersService.update(userId, {
      refreshTokens: [hash],
    });
  }

  async getTokens(userId: number, email: string, role: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userId, email, role },
        {
          secret: jwtConfig.secret,
          expiresIn: jwtConfig.expiresIn,
        },
      ),
      this.jwtService.signAsync(
        { sub: userId, email, role },
        {
          secret: jwtConfig.refreshSecret,
          expiresIn: jwtConfig.refreshExpiresIn,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
