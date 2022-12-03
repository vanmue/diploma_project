import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterShopNotNullInShopImages1669897129527
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'shop_images',
      'shopId',
      new TableColumn({
        name: 'shopId',
        type: 'integer',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'shop_images',
      'shopId',
      new TableColumn({
        name: 'shopId',
        type: 'integer',
        isNullable: true,
      }),
    );
  }
}
