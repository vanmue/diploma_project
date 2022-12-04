import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropPathOldInFiles1670152845458 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('files', 'path_old');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
