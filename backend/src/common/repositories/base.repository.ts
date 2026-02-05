import { PrismaService } from '../../prisma/prisma.service';

export abstract class BaseRepository<
  T,
  CreateInput,
  UpdateInput,
  WhereUniqueInput,
  WhereInput,
  OrderByInput,
> {
  constructor(
    protected prisma: PrismaService,
    protected modelName: string,
  ) {}

  async create(data: CreateInput): Promise<T> {
    return (this.prisma as any)[this.modelName].create({ data });
  }

  async findUnique(where: WhereUniqueInput, include?: any): Promise<T | null> {
    return (this.prisma as any)[this.modelName].findUnique({ where, include });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    where?: WhereInput;
    orderBy?: OrderByInput;
    include?: any;
  }): Promise<T[]> {
    const { skip, take, where, orderBy, include } = params;
    return (this.prisma as any)[this.modelName].findMany({
      skip,
      take,
      where,
      orderBy,
      include,
    });
  }

  async update(params: {
    where: WhereUniqueInput;
    data: UpdateInput;
  }): Promise<T> {
    const { where, data } = params;
    return (this.prisma as any)[this.modelName].update({ where, data });
  }

  async delete(where: WhereUniqueInput): Promise<T> {
    return (this.prisma as any)[this.modelName].delete({ where });
  }

  async count(where?: WhereInput): Promise<number> {
    return (this.prisma as any)[this.modelName].count({ where });
  }
}
