// V1
// import { PrismaClient } from '@prisma/client';

// let db;

// if (!global.prisma) {
//     db = new PrismaClient();
//     if (process.env.NODE_ENV !== 'production') {
//         global.prisma = db;
//     }
// } else {
//     db = global.prisma;
// }

// export default db;

// V2
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
    return new PrismaClient();
};

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export default db;
