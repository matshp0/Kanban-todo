import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from 'src/data/repository/board.repository';
import { BoardDto, TaskDto } from '@todo/utils';
import { plainToInstance } from 'class-transformer';
import { CreateBoardDto, CreateTaskDto, UpdateBoardDto } from '@todo/utils';
import { TaskRepository } from 'src/data/repository/task.repository';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly taskRepository: TaskRepository,
  ) {}

  async getAll(): Promise<BoardDto[]> {
    const boards = await this.boardRepository.findAll();
    return plainToInstance(BoardDto, boards);
  }

  async createBoard(dto: CreateBoardDto): Promise<BoardDto> {
    const board = await this.boardRepository.create(dto);
    return plainToInstance(BoardDto, board);
  }

  async findById(id: string): Promise<BoardDto> {
    const board = await this.boardRepository.findById(id);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    return plainToInstance(BoardDto, board);
  }

  async findTasksById(id: string): Promise<TaskDto[]> {
    const board = await this.boardRepository.findById(id);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    const tasks = await this.taskRepository.findByBoardId(id);

    return plainToInstance(
      TaskDto,
      tasks.map(({ task }) => task),
    );
  }

  async updateName(id: string, dto: UpdateBoardDto): Promise<BoardDto> {
    const existingBoard = await this.boardRepository.findById(id);
    if (!existingBoard) {
      throw new NotFoundException('Board not found');
    }
    const board = await this.boardRepository.updateById(id, dto);
    return plainToInstance(BoardDto, board);
  }

  async deleteBoard(id: string): Promise<void> {
    const existingBoard = await this.boardRepository.findById(id);
    if (!existingBoard) {
      throw new NotFoundException('Board not found');
    }
    await this.boardRepository.deleteById(id);
  }

  async createTask(id: string, dto: CreateTaskDto): Promise<TaskDto> {
    const existingBoard = await this.boardRepository.findById(id);
    if (!existingBoard) {
      throw new NotFoundException('Board not found');
    }
    const board = await this.taskRepository.create(id, dto);
    return plainToInstance(TaskDto, board);
  }
}
