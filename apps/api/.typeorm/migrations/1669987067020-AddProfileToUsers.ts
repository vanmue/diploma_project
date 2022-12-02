import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const table = 'users';
const column = 'profileId';

export class AddProfileToUsers1669987067020 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      table,
      new TableColumn({
        name: column,
        type: 'int',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(table, column);
  }
}
