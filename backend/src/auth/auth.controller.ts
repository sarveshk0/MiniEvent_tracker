import {
  Controller,
  Post,
  Body,
  Res,
  UseGuards,
  Req,
  UnauthorizedException,
  HttpStatus,
  HttpCode,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { Response, Request } from 'express';
import { AtGuard } from './guards/at.guard';
import { RtGuard } from './guards/rt.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator'; // Assuming Public decorator is defined here

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const tokens = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!tokens) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const result = await this.authService.login(tokens);
    this.setCookies(res, result);
    return { message: 'Login successful' };
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.register(registerDto);
    this.setCookies(res, result);
    return { message: 'Registration successful' };
  }

  @Post('logout')
  @UseGuards(AtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User logout' })
  async logout(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    if (req.user) {
      await this.authService.logout(req.user.userId);
    }
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return { message: 'Logged out successfully' };
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Refresh access token' })
  async refresh(@Req() req: any, @Res({ passthrough: true }) res: Response) {
    const tokens = await this.authService.refresh(
      req.user.userId,
      req.user.refreshToken,
    );
    this.setCookies(res, tokens);
    return { message: 'Token refreshed' };
  }

  @UseGuards(AtGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user (session check)' })
  async me(@Req() req: any) {
    return req.user;
  }

  private setCookies(
    res: Response,
    tokens: { access_token: string; refresh_token: string },
  ) {
    res.cookie('access_token', tokens.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000, // 15 mins
    });
    res.cookie('refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  }
}
