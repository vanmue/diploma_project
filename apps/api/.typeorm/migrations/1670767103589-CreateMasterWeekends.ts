import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const table = 'master_weekends';

const sequence = 'master_weekends_seq';

const fk = 'FK_WEEKEND_MASTER';

const unique = 'UNIQUE_WEEKEND_NUMBER_MASTER_ID';

export class CreateMasterWeekends1670767103589 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SEQUENCE ${sequence} INCREMENT 1 START 1;`);

    await queryRunner.createTable(
      new Table({
        name: table,
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            isPrimary: true,
            default: `nextval('${sequence}')`,
          }),
          new TableColumn({
            name: 'masterId',
            type: 'int',
          }),
          new TableColumn({
            name: 'weekday',
            type: 'int',
            comment: 'номер дня недели',
          }),
          new TableColumn({
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          }),
          new TableColumn({
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          }),
        ],
        uniques: [
          {
            name: unique,
            columnNames: ['masterId', 'weekday'],
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: fk,
            columnNames: ['masterId'],
            referencedTableName: 'masters',
            referencedColumnNames: ['id'],
            onDelete: 'RESTRICT',
          }),
        ],
      }),
    );

    await queryRunner.query(
      `INSERT INTO master_weekends ("masterId", weekday) 
        SELECT masters.id, weekends.number
        FROM masters
        CROSS JOIN (
          SELECT 6 as number
          UNION ALL
          SELECT 7
        ) AS weekends`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table, true, true);
    await queryRunner.query(`DROP SEQUENCE ${sequence};`);
  }
}
