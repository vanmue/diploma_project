import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const table = 'deliverable_groups';

export class DropImageInDeliverableGroups1670062469757
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(table, 'image');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      table,
      new TableColumn({
        name: 'image',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
