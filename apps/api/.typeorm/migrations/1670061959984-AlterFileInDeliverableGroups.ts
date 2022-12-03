import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const table = 'deliverable_groups';
const name = 'imageId';
const fk = 'FK_DELIVERABLE_GROUP_FILE';

export class AlterFileInDeliverableGroups1670061959984
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Добавить столбец
    await queryRunner.addColumn(
      table,
      new TableColumn({
        name,
        type: 'int',
        isNullable: true,
      }),
    );

    // Вписать id файла
    await queryRunner.query(
      `UPDATE ${table} SET "${name}" = (SELECT id FROM files WHERE files.path = ${table}.image);`,
    );

    // Убрать nullable
    await queryRunner.query(
      `ALTER TABLE ${table} ALTER COLUMN "${name}" SET NOT NULL;`,
    );

    // Создать внешний ключ
    await queryRunner.createForeignKey(
      table,
      new TableForeignKey({
        name: fk,
        columnNames: [name],
        referencedTableName: 'files',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(table, fk);
    await queryRunner.dropColumn(table, name);
  }
}
