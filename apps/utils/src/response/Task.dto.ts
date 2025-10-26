import { Expose } from 'class-transformer';
import { TaskStatus } from '../database/enums';

export class TaskDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description: string | null;

  @Expose()
  status: TaskStatus;

  @Expose()
  createdAt: string;

  @Expose()
  updatedAt: string;
}
