import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterReviewsAppointmentId1669231560501
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reviews" ALTER COLUMN "appointmentId" SET NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reviews" ALTER COLUMN "appointmentId" DROP NOT NULL;`,
    );
  }
}
