import { Expose } from "class-transformer";
import { TaskStatus } from "../database/enums";

export class TaskDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  description?: string;

  @Expose()
  status: TaskStatus;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
