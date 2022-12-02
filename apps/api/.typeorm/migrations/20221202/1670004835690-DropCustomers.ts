import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropCustomers1670004835690 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('customers', true, true, true);
    await queryRunner.query(`DROP SEQUENCE customers_id_seq;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
