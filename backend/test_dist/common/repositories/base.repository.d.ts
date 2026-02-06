import { PrismaService } from '../../prisma/prisma.service';
export declare abstract class BaseRepository<T, CreateInput, UpdateInput, WhereUniqueInput, WhereInput, OrderByInput> {
    protected prisma: PrismaService;
    protected modelName: string;
    constructor(prisma: PrismaService, modelName: string);
    create(data: CreateInput): Promise<T>;
    findUnique(where: WhereUniqueInput, include?: any): Promise<T | null>;
    findMany(params: {
        skip?: number;
        take?: number;
        where?: WhereInput;
        orderBy?: OrderByInput;
        include?: any;
    }): Promise<T[]>;
    update(params: {
        where: WhereUniqueInput;
        data: UpdateInput;
    }): Promise<T>;
    delete(where: WhereUniqueInput): Promise<T>;
    count(where?: WhereInput): Promise<number>;
}
