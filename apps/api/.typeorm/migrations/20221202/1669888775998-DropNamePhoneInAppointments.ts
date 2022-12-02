import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

const table = 'appointments';

export class DropNamePhoneInAppointments1669888775998
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns(table, ['name', 'phone']);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const name = new TableColumn({
      name: 'name',
      type: 'varchar',
      isNullable: true,
    });
    const phone = new TableColumn({
      name: 'phone',
      type: 'varchar',
      isNullable: true,
    });
    await queryRunner.addColumns(table, [name, phone]);
  }
}
