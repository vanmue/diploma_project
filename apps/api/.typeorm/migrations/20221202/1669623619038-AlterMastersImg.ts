import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterMastersImg1669623619038 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'masters',
      new TableColumn({ name: 'imgId', type: 'int', default: -1 }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('masters', 'imgId');
  }
}
