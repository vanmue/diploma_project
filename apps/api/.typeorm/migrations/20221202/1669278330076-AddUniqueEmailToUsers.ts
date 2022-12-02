import { MigrationInterface, QueryRunner, TableUnique } from 'typeorm';

export class AddUniqueEmailToUsers1669278330076 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createUniqueConstraint(
      'users',
      new TableUnique({
        name: 'unique_email_constrtaint',
        columnNames: ['email'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropUniqueConstraint('users', 'unique_email_constrtaint');
  }
}
