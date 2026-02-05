import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string | null;

  @ApiProperty()
  role: string;

  @Exclude()
  passwordHash: string;

  @Exclude()
  refreshTokens: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
