import {
  MigrationInterface,
  QueryRunner,
  TableCheck,
  TableColumn,
} from 'typeorm';

const table = 'masters';

const check = 'CHECK_WORKING_END_LATER_THAN START';

export class migrations1670356210144 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns(table, [
      new TableColumn({
        name: 'working_start',
        type: 'time',
        isNullable: true,
      }),
      new TableColumn({
        name: 'working_end',
        type: 'time',
        isNullable: true,
      }),
    ]);
    await queryRunner.createCheckConstraint(
      table,
      new TableCheck({
        name: check,
        expression: 'working_end > working_start',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropCheckConstraint(table, check);
    await queryRunner.dropColumns(table, ['working_start', 'working_end']);
  }
}
