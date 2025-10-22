import { Injectable } from '@nestjs/common';
import { PrismaService } from '../providers/prisma.service';
import { Prisma } from 'generated';

@Injectable()
export class TaskRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.task.findMany();
  }

  async create(boardId: string, data: Prisma.TaskCreateInput) {
    return this.prismaService.$transaction(async (tx) => {
      const task = await tx.task.create({
        data,
      });
      await tx.boardTask.create({
        data: {
          taskId: task.id,
          boardId: boardId,
        },
      });
      return task;
    });
  }

  async findByBoardId(boardId: string) {
    return await this.prismaService.boardTask.findMany({
      where: {
        boardId: boardId,
      },
      include: {
        task: true,
      },
    });
  }

  async findById(id: string) {
    return await this.prismaService.task.findUnique({
      where: {
        id,
      },
    });
  }

  async updateById(id: string, data: Prisma.TaskUpdateInput) {
    return await this.prismaService.task.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async deleteById(id: string) {
    return await this.prismaService.task.delete({
      where: {
        id: id,
      },
    });
  }
}
