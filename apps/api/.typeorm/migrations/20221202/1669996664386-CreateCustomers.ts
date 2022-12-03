import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const table = 'customers';
const fk = 'FK_CUSTOMERS_PROFILE';

export class CreateCustomers1669996664386 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SEQUENCE customers_id_seq INCREMENT 1 START 1;`,
    );
    await queryRunner.createTable(
      new Table({
        name: table,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            default: `nextval('customers_id_seq')`,
          },
          {
            name: 'profileId',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      table,
      new TableForeignKey({
        name: fk,
        columnNames: ['profileId'],
        referencedTableName: 'profiles',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table, true, true);
    await queryRunner.query(`DROP SEQUENCE customers_id_seq;`);
  }
}
