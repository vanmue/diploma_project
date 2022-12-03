import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

const unique = 'UNIQUE_APPOINTMENT_REVIEW';

export class AddUniqueToReviews1670104390093 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE
        FROM reviews
        WHERE
          ("appointmentId", "profileId") = (
            SELECT
              "appointmentId", "profileId"
            FROM reviews 
            GROUP BY "appointmentId", "profileId" 
            HAVING COUNT(id) > 1
          )`,
    );

    await queryRunner.createUniqueConstraint(
      'reviews',
      new TableUnique({
        name: unique,
        columnNames: ['appointmentId', 'profileId'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('reviews', unique);
  }
}
