import { PrismaService } from '../../prisma/prisma.service';
export declare class KeepAliveService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    handleCron(): Promise<void>;
    onModuleInit(): Promise<void>;
}
