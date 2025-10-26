import { IsString, MaxLength, IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../database';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
