import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterReviewsColumns1669231304375 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reviews" ALTER COLUMN "authorId" SET NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reviews" ALTER COLUMN "authorId" DROP NOT NULL;`,
    );
  }
}
