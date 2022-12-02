import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

const name = 'UNIQUE_USER_PROFILE_TYPE_PROFILE_ID';

export class AddConstraintToProfiles1669985257672
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'profiles',
      new TableUnique({
        name,
        columnNames: ['userId', 'profile_type', 'profile_id'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('profiles', name);
  }
}
