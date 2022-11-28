import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AddForeignKeyToMasters1669625066402 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'masters',
      new TableForeignKey({
        name: 'FK_IMGID',
        columnNames: ['imgId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'files',
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('masters', 'FK_IMGID');
  }
}
