import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterProfileInMasters1669991682362 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE masters ALTER COLUMN "imgId" DROP DEFAULT;`,
    );

    await queryRunner.query(
      `ALTER TABLE masters ALTER COLUMN "profileId" SET NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE masters ALTER COLUMN "imgId" SET DEFAULT -1;`,
    );

    await queryRunner.query(
      `ALTER TABLE masters ALTER COLUMN "profileId" DROP NOT NULL;`,
    );
  }
}
