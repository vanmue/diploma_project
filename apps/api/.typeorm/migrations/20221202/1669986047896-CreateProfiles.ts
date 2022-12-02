import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const table = 'profiles';
const fk = 'FK_PROFILE_USER';

export class ProfileEntity1669981642471 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SEQUENCE profiles_id_seq INCREMENT 1 START 1;`,
    );

    await queryRunner.createTable(
      new Table({
        name: table,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            default: `nextval('profiles_id_seq')`,
          },
          {
            name: 'userId',
            type: 'int',
          },
          {
            name: 'profile_type',
            type: 'varchar',
          },
          {
            name: 'profile_id',
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
      true,
    );
    await queryRunner.createForeignKey(
      table,
      new TableForeignKey({
        name: fk,
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table, true, true);
  }
}
