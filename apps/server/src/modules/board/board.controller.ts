import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from '@todo/utils';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/')
  getBoards() {
    return this.boardService.getAll();
  }

  @Post('/')
  createBoard(@Body() dto: CreateBoardDto) {
    return this.boardService.createBoard(dto);
  }

  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.boardService.findById(id);
  }
}
