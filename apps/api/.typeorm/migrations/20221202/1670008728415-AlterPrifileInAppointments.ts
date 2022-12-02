import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterPrifileInAppointments1670008728415
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE appointments ALTER COLUMN "profileId" SET NOT NULL;`,
    );
    await queryRunner.query(
      `ALTER TABLE appointments ALTER COLUMN "masterId" SET NOT NULL;`,
    );
    await queryRunner.query(
      `ALTER TABLE appointments ALTER COLUMN "shopId" SET NOT NULL;`,
    );
    const deliverable = await queryRunner.query(
      `SELECT id FROM deliverables LIMIT 1;`,
    );
    await queryRunner.query(
      `UPDATE appointments SET "deliverableId" = ${deliverable[0].id} WHERE "deliverableId" IS NULL;`,
    );
    await queryRunner.query(
      `ALTER TABLE appointments ALTER COLUMN "deliverableId" SET NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE appointments ALTER COLUMN "profileId" DROP NOT NULL;`,
    );
    await queryRunner.query(
      `ALTER TABLE appointments ALTER COLUMN "deliverableId" DROP NOT NULL;`,
    );
    await queryRunner.query(
      `ALTER TABLE appointments ALTER COLUMN "masterId" DROP NOT NULL;`,
    );
    await queryRunner.query(
      `ALTER TABLE appointments ALTER COLUMN "shopId" DROP NOT NULL;`,
    );
  }
}
