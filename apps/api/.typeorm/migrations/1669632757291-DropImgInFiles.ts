import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DropImgInFiles1669632757291 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('masters', 'img');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'masters',
      new TableColumn({ name: 'img', type: 'varchar', isNullable: true }),
    );
  }
}
