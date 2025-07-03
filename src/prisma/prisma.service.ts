import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private _pagamento: any;
  public get pagamento(): any {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return this._pagamento;
  }
  public set pagamento(value: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this._pagamento = value;
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
