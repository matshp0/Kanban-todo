import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { DataModule } from 'src/data/data.module';

@Module({
  providers: [TaskService],
  controllers: [TaskController],
  imports: [DataModule],
})
export class TaskModule {}
