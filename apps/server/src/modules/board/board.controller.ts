import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardDto, CreateBoardDto, UpdateBoardDto } from '@todo/utils';

@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('/')
  getBoards(): Promise<BoardDto[]> {
    return this.boardService.getAll();
  }

  @Post('/')
  createBoard(@Body() dto: CreateBoardDto): Promise<BoardDto> {
    return this.boardService.createBoard(dto);
  }

  @Get('/:id')
  findById(@Param('id') id: string): Promise<BoardDto> {
    return this.boardService.findById(id);
  }

  @Patch('/:id/name')
  updateName(
    @Param('id') id: string,
    @Body() dto: UpdateBoardDto,
  ): Promise<BoardDto> {
    return this.boardService.updateName(id, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('/:id')
  deleteBoard(@Param('id') id: string): Promise<void> {
    return this.boardService.deleteBoard(id);
  }
}
