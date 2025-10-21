import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { DataModule } from 'src/data/data.module';

@Module({
  providers: [BoardService],
  controllers: [BoardController],
  imports: [DataModule],
})
export class BoardModule {}
