import { Injectable } from '@nestjs/common';
import { BoardRepository } from 'src/data/repository/board.repository';
import { BoardDto } from '@todo/utils/response';
import { plainToInstance } from 'class-transformer';
import { CreateBoardDto } from '@todo/utils';

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

  findById(id: string) {
    return this.boardRepository.findById(id);
  }
}
