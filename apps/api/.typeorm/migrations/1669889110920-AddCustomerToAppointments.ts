import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const fieldName = 'customerId';
const fkName = 'FK_APPOINTMENT_CUSTOMER';

export class AddCustomerToAppointments1669889110920
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = await queryRunner.query('SELECT * FROM users LIMIT 1');
    const { id } = users[0];

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: fieldName,
        type: 'integer',
        default: id,
      }),
    );

    await queryRunner.changeColumn(
      'appointments',
      fieldName,
      new TableColumn({
        name: fieldName,
        type: 'integer',
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: fkName,
        columnNames: [fieldName],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', fkName);
    await queryRunner.dropColumn('appointments', fieldName);
  }
}
