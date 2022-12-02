import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const table = 'reviews';
const type = 'customer';
const fk = 'FK_APPOINTMENT_REVIEW_CUSTOMER_PROFILE';
const profileColumn = new TableColumn({
  name: 'profileId',
  type: 'int',
  isNullable: true,
});

export class AddProfileToReviews1670006439205 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Добавление profileId

    await queryRunner.addColumn(table, profileColumn);

    // 2. Добавление данных

    let p = Promise.resolve(null);

    const rows = await queryRunner.query(
      `SELECT DISTINCT "authorId" AS "userId" FROM ${table};`,
    );
    rows.forEach((row) => {
      p = p.then(() =>
        queryRunner.query(
          `SELECT id FROM profiles WHERE "userId" = ${row.userId} AND profile_type = 'customer';`,
        ),
      );
      p = p.then((inserted) => {
        const { id } = inserted[0];
        return queryRunner.query(
          `UPDATE ${table} SET "profileId" = ${id} WHERE "authorId" = ${row.userId}`,
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
      (fk) => fk.columnNames.indexOf('authorId') !== -1,
    );
    await queryRunner.dropForeignKey(table, foreignKey);

    // 6. Удаленеи userId

    await queryRunner.dropColumn(table, 'authorId');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
