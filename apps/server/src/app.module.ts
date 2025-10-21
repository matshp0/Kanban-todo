import { Module } from '@nestjs/common';
import { BoardModule } from './modules/board/board.module';

@Module({
  imports: [BoardModule],
})
export class AppModule {}
