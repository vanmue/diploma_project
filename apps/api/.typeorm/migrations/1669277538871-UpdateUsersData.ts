import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUsersData1669277538871 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE users SET email=CONCAT('test', users.id, '@test.com'), password='$2y$10$afuQNOq/BxsNQbSVeKZoEO.iKlIlrhnflkcLuP6YxIDUuc1ZBYEb2';`, // 12345
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `UPDATE users SET email=NULL, password=NULL;`, // 12345
    );
  }
}
