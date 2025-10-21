import { Module } from '@nestjs/common';
import { BoardRepository } from './repository/board.repository';
import { PrismaService } from './providers/prisma.service';

@Module({
  providers: [PrismaService, BoardRepository],
  exports: [BoardRepository],
})
export class DataModule {}
