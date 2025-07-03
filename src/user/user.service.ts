import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../user//dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const { email, password, name } = data;
    const userExists = await this.prisma.user.findUnique({
      where: { email: String(email) },
    });
    if (userExists) {
      throw new ConflictException('Email já cadastrado');
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email: String(email), password: hash, name: String(name) },
    });
    const { password: _password, ...result } = user;
    return result;
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
