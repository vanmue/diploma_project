import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const fkName = 'FK_SHOP_IMAGE_FILE';
const columnName = 'fileId';

export class AddFileToShopImage1669798386990 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'shop_images',
      new TableColumn({
        name: columnName,
        type: 'integer',
        default: -1,
      }),
    );

    await queryRunner.query(`
      UPDATE shop_images SET "fileId" = (SELECT id FROM files WHERE shop_images.img LIKE CONCAT('%', files.originalname, '%'));
    `);

    await queryRunner.changeColumn(
      'shop_images',
      columnName,
      new TableColumn({
        name: columnName,
        type: 'integer',
      }),
    );

    await queryRunner.createForeignKey(
      'shop_images',
      new TableForeignKey({
        name: fkName,
        columnNames: [columnName],
        referencedTableName: 'files',
        referencedColumnNames: ['id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('shop_images', fkName);
    await queryRunner.dropColumn('shop_images', columnName);
  }
}
