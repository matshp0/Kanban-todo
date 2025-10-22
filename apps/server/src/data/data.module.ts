import { Module } from '@nestjs/common';
import { BoardRepository } from './repository/board.repository';
import { PrismaService } from './providers/prisma.service';
import { TaskRepository } from './repository/task.repository';

@Module({
  providers: [PrismaService, BoardRepository, TaskRepository],
  exports: [BoardRepository, TaskRepository],
})
export class DataModule {}
