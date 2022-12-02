import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const table = 'users';
const column = 'avatarId';
const fk = 'FK_USER_AVATAR_FILE_ID';

export class AddAvatarIdToUsers1669901077887 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const files = await queryRunner.query(`SELECT id FROM files LIMIT 1;`);
    const fileId = files[0].id;
    await queryRunner.addColumn(
      table,
      new TableColumn({
        name: column,
        type: 'integer',
        default: fileId,
      }),
    );
    await queryRunner.createForeignKey(
      table,
      new TableForeignKey({
        name: fk,
        columnNames: [column],
        referencedTableName: 'files',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );
    await queryRunner.changeColumn(
      table,
      column,
      new TableColumn({
        name: column,
        type: 'integer',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(table, fk);
    await queryRunner.dropColumn(table, column);
  }
}
