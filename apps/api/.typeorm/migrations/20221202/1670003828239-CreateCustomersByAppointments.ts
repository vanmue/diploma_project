import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const table = 'appointments';
const type = 'customer';
const fk = 'FK_APPOINTMENT_CUSTOMER_PROFILE';
const profileColumn = new TableColumn({
  name: 'profileId',
  type: 'int',
  isNullable: true,
});

export class InsertCustomersFromAppointmentUsers1669997580729
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Добавление profileId

    await queryRunner.addColumn(table, profileColumn);

    // 2. Добавление данных

    let p = Promise.resolve(null);

    const rows = await queryRunner.query(
      `SELECT DISTINCT "customerId" AS "userId" FROM ${table};`,
    );
    console.log('rows', rows);
    rows.forEach((row) => {
      p = p.then(() =>
        queryRunner.query(
          `INSERT INTO profiles ("userId", profile_type) VALUES (${row.userId}, '${type}') RETURNING id;`,
        ),
      );
      p = p.then((inserted) => {
        const { id } = inserted[0];
        return queryRunner.query(
          `UPDATE ${table} SET "profileId" = ${id} WHERE "customerId" = ${row.userId}`,
        );
      });
    });
    await p;

    // 3. Снятие атрибута nullable

    profileColumn.isNullable = false;
    await queryRunner.changeColumn(table, profileColumn.name, profileColumn);

    // 4. Создание первичного ключа на профиль

    await queryRunner.createForeignKey(
      table,
      new TableForeignKey({
        name: fk,
        columnNames: ['profileId'],
        referencedTableName: 'profiles',
        referencedColumnNames: ['id'],
      }),
    );

    // 5. Удаление первичного ключа на users

    const tableItem = await queryRunner.getTable(table);
    const foreignKey = await tableItem.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('customerId') !== -1,
    );
    await queryRunner.dropForeignKey(table, foreignKey);

    // 6. Удаленеи userId

    await queryRunner.dropColumn(table, 'customerId');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
