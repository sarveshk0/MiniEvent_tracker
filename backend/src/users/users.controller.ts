import {
  Controller,
  Get,
  UseGuards,
  Req,
  UseInterceptors,
  ClassSerializerInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AtGuard } from '../auth/guards/at.guard';
import { UserResponseDto } from './dto/user-response.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({ status: 200, type: UserResponseDto })
  async getMe(@Req() req: any): Promise<UserResponseDto> {
    const user = await this.usersService.findById(req.user.userId);
    if (!user) throw new NotFoundException('User not found');
    return new UserResponseDto(user);
  }
}
