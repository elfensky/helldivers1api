import {
    getPrismaProvider,
    runMigrations,
    generateOpenApiSpec,
} from '@/utils/initialize.mjs';
import { tryCatch } from '@/lib/tryCatch.mjs';

await generateOpenApiSpec();

//move initializeDB to initialize.mjs and export it instead of getPrismaProvider and runMigrations
async function initializeDatabase() {
    // const { data, error } = await tryCatch(getPrismaProvider());

    // const provider = getPrismaProvider();
    // console.log('AAAAAAAAAAAAAA', data, error);

    if (true) {
        // provider === 'postgresql'
        console.log("DATABASE - using 'postgresql' provider");
        // migrate the database if needed
        const { data, error } = await tryCatch(runMigrations());
        console.log(data, error);
        // await runMigrations();
        // console.log('DATABASE - completed migrations\n');
        return true;
    }

    console.error('DATABASE - using unknown provider:', provider);
    throw new Error('DATABASE - unknown database provider:', provider);
}

// const { initDB, errorDB } = tryCatch(initializeDatabase());
// console.log('initDB', initDB, errorDB);
// if (errorDB) {
//     console.error(errorDB);
//     exit(1);
// }
