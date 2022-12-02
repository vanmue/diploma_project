import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class DropAvatarInUsers1669901743014 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'avatar');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'avatar',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
