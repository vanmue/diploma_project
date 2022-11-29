import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import dataSource from '../config/data.source';

export class AddUserToAppointments1669752055330 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const users = await dataSource.query('SELECT * FROM users LIMIT 1');
    const { id } = users[0];

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'userId',
        type: 'integer',
        default: id,
      }),
    );

    await queryRunner.changeColumn(
      'appointments',
      'userId',
      new TableColumn({
        name: 'userId',
        type: 'integer',
      }),
    );

    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'FK_APPOINTMENT_USER',
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'FK_APPOINTMENT_USER');
    await queryRunner.dropColumn('appointments', 'userId');
  }
}
