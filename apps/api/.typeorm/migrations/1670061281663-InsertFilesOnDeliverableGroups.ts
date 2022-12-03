import { MigrationInterface, QueryRunner } from 'typeorm';

export class InsertFilesOnDeliverableGroups1670061281663
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO files (originalname, path, mimetype, size)
         SELECT regexp_replace(deliverable_groups.image, '^.+/', ''), deliverable_groups.image, 'image/png', 1111
         FROM deliverable_groups;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
