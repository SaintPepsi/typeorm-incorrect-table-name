import InitSqlJsStatic from 'sql.js';
import { DataSource } from "typeorm";
import { MasterSeed0000000000001 } from './MasterSeed';
import { GoalCategoryEntity } from './entities/GoalCategoryEntity';
import { GoalEntity } from './entities/GoalEntity';
import { GoalFrequencyEntity } from './entities/GoalFrequencyEntity';
import { GoalMethodEntity } from './entities/GoalMethodEntity';

const dataSource = new DataSource({
    type: 'sqljs',
    location: 'browser_sqljs_database',
    driver: InitSqlJsStatic,
    sqlJsConfig: {
        locateFile: (file: string) => {
            return `./${file}`;
        }
    },
    autoSave: true,
    entities: [GoalEntity, GoalCategoryEntity, GoalFrequencyEntity, GoalMethodEntity],
    migrations: [MasterSeed0000000000001],
    logging: ['query', 'schema'],
});

async function initialiseDatabase() {
    await dataSource.initialize();
    await dataSource.dropDatabase();
    await dataSource.runMigrations();


    dataSource.manager.find(GoalEntity).then((goals) => {
        console.log('Goals', goals);
    })
}

initialiseDatabase().catch(console.error);
