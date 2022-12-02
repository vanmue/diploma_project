import { MigrationInterface, QueryRunner } from 'typeorm';

const table = 'profiles';
const name = 'UNIQUE_USER_PROFILE_TYPE_PROFILE_ID';

export class DropTypeIdInProfiles1669993870539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint(table, name);
    await queryRunner.dropColumn(table, 'profile_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
