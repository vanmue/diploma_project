import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DromImgInShopImages1669799085539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('shop_images', 'img');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'shop_images',
      new TableColumn({
        name: 'img',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
