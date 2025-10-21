import { Injectable } from '@nestjs/common';
import { PrismaService } from '../providers/prisma.service';
import { Prisma } from 'generated';

@Injectable()
export class BoardRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll() {
    return this.prismaService.board.findMany();
  }

  create(data: Prisma.BoardCreateInput) {
    return this.prismaService.board.create({
      data,
    });
  }

  findById(id: string) {
    return this.prismaService.board.findUnique({
      where: {
        id,
      },
    });
  }

  updateById(id: string, data: Prisma.BoardUpdateInput) {
    return this.prismaService.board.update({
      data,
      where: {
        id: id,
      },
    });
  }
}
