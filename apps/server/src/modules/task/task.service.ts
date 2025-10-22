import { Injectable } from '@nestjs/common';
import { CreateTaskDto, TaskDto, UpdateTaskDto } from '@todo/utils';
import { plainToInstance } from 'class-transformer';
import { TaskRepository } from 'src/data/repository/task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getAll(): Promise<TaskDto[]> {
    const tasks = await this.taskRepository.findAll();
    return plainToInstance(TaskDto, tasks);
  }

  async findById(id: string): Promise<TaskDto> {
    const task = await this.taskRepository.findById(id);
    return plainToInstance(TaskDto, task);
  }

  async updateName(id: string, dto: UpdateTaskDto): Promise<TaskDto> {
    const task = await this.taskRepository.updateById(id, dto);
    return plainToInstance(TaskDto, task);
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.deleteById(id);
  }
}
