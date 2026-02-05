import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsFutureDate } from '../../common/decorators/is-future-date.decorator';

export class CreateEventDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  @IsFutureDate()
  dateTime: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;
}

export class UpdateEventDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  @IsFutureDate()
  dateTime?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  location?: string;
}
