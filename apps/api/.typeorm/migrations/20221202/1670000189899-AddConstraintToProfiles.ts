import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

const table = 'profiles';
const unique = 'USER_PROFILE_TYPE_UNIQUE';

export class AddConstraintToProfiles1670000189899
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      table,
      new TableUnique({
        name: unique,
        columnNames: ['userId', 'profile_type'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint(table, unique);
  }
}
