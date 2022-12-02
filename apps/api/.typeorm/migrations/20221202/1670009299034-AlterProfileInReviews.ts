import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterProfileInReviews1670009299034 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const profile = await queryRunner.query(
      `SELECT id FROM profiles WHERE profile_type = 'customer' LIMIT 1;`,
    );
    await queryRunner.query(
      `UPDATE reviews SET "profileId" = ${profile[0].id} WHERE "profileId" IS NULL;`,
    );
    await queryRunner.query(
      `ALTER TABLE reviews ALTER COLUMN "profileId" SET NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE reviews ALTER COLUMN "profileId" DROP NOT NULL;`,
    );
  }
}
