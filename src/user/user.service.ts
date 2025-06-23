import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(email: string, password: string, name: string) {
    const userExists = await this.prisma.user.findUnique({ where: { email } });
    if (userExists) {
      throw new ConflictException('Email já cadastrado');
    }
    const hash = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { email, password: hash, name },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
