import {
    Table,
    TableForeignKey,
    type MigrationInterface,
    type QueryRunner,
    type TableColumnOptions
} from 'typeorm';

// Helper Columns
const autoIncrementIdColumn: TableColumnOptions = {
    name: 'id',
    type: 'integer',
    isPrimary: true,
    isGenerated: true,
    generationStrategy: 'increment'
};

const syncableColumns: TableColumnOptions[] = [
    { name: 'user_id', type: 'integer', isNullable: true },
    { name: 'is_sync_deleted', type: 'boolean', default: false },
    { name: 'created_at', type: 'timestamp', default: 'now()', isNullable: false },
    { name: 'updated_at', type: 'timestamp', default: 'now()', isNullable: false }
];

// Start Migration
export class MasterSeed0000000000001 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create Goal Category
        await queryRunner.createTable(
            new Table({
                name: 'goal_category',
                columns: [autoIncrementIdColumn, { name: 'category', type: 'text', isUnique: true }]
            }),
            true
        );
        // Create Goal Frequency
        await queryRunner.createTable(
            new Table({
                name: 'goal_frequency',
                columns: [
                    autoIncrementIdColumn,
                    { name: 'frequency', type: 'text', isUnique: true }
                ]
            }),
            true
        );
        // Create Goal Method
        await queryRunner.createTable(
            new Table({
                name: 'goal_method',
                columns: [autoIncrementIdColumn, { name: 'method', type: 'text', isUnique: true }]
            }),
            true
        );

        // Create Goal Table
        await queryRunner.createTable(
            new Table({
                name: 'goal',
                columns: [
                    autoIncrementIdColumn,
                    // Syncable Columns
                    ...syncableColumns,
                    // Goal Columns
                    { name: 'desired_goal_amount', type: 'integer' },
                    { name: 'current_goal_amount', type: 'integer' },
                    // Foreign Keys
                    { name: 'goal_category_id', type: 'integer', isNullable: false },
                    { name: 'goal_frequency_id', type: 'integer', isNullable: false },
                    { name: 'goal_method_id', type: 'integer', isNullable: false }
                ]
            }),
            true
        );

        // Create Goal Foreign Keys
        await queryRunner.createForeignKeys('goal', [
            new TableForeignKey({
                columnNames: ['goal_category_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'goal_category'
            }),
            new TableForeignKey({
                columnNames: ['goal_frequency_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'goal_frequency'
            }),
            new TableForeignKey({
                columnNames: ['goal_method_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'goal_method'
            })
        ]);

        // Create Calendar Entry Table
        await queryRunner.createTable(
            new Table({
                name: 'calendar_entry',
                columns: [
                    autoIncrementIdColumn,
                    // Syncable Columns
                    ...syncableColumns,
                    // Goal Columns
                    { name: 'date', type: 'date', isNullable: false },
                    { name: 'amount', type: 'numeric' },
                    // Foreign Keys
                    { name: 'goal_id', type: 'integer', isNullable: false }
                ]
            }),
            true
        );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Remove goal categories from database

    }
}
