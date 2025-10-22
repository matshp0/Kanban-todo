import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from 'src/data/repository/board.repository';
import { BoardDto } from '@todo/utils/response';
import { plainToInstance } from 'class-transformer';
import { CreateBoardDto, UpdateBoardDto } from '@todo/utils';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

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
    return plainToInstance(BoardDto, board);
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
}
