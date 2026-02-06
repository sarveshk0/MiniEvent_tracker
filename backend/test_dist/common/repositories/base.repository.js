"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    constructor(prisma, modelName) {
        this.prisma = prisma;
        this.modelName = modelName;
    }
    async create(data) {
        return this.prisma[this.modelName].create({ data });
    }
    async findUnique(where, include) {
        return this.prisma[this.modelName].findUnique({ where, include });
    }
    async findMany(params) {
        const { skip, take, where, orderBy, include } = params;
        return this.prisma[this.modelName].findMany({
            skip,
            take,
            where,
            orderBy,
            include,
        });
    }
    async update(params) {
        const { where, data } = params;
        return this.prisma[this.modelName].update({ where, data });
    }
    async delete(where) {
        return this.prisma[this.modelName].delete({ where });
    }
    async count(where) {
        return this.prisma[this.modelName].count({ where });
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=base.repository.js.map