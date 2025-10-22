import { Injectable } from '@nestjs/common';
import { PrismaService } from '../providers/prisma.service';
import { Prisma } from 'generated';

@Injectable()
export class BoardRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return await this.prismaService.board.findMany();
  }

  async create(data: Prisma.BoardCreateInput) {
    return await this.prismaService.board.create({
      data,
    });
  }

  async findById(id: string) {
    return await this.prismaService.board.findUnique({
      where: {
        id,
      },
    });
  }

  async updateById(id: string, data: Prisma.BoardUpdateInput) {
    return await this.prismaService.board.update({
      data,
      where: {
        id: id,
      },
    });
  }

  async deleteById(id: string) {
    return await this.prismaService.board.delete({
      where: {
        id: id,
      },
    });
  }
}
