import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

const table = 'masters';
const type = 'master';
const fk = 'FK_MASTER_PROFILE';

const profileColumn = new TableColumn({
  name: 'profileId',
  type: 'int',
  isNullable: true,
});

export class AddProfileToMasters1669983094954 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Добавление profileId

    await queryRunner.addColumn(table, profileColumn);

    // 2. Добавление данных

    let p = Promise.resolve(null);
    const rows = await queryRunner.query(`SELECT id, "userId" FROM ${table};`);
    rows.forEach((row) => {
      p = p.then(() =>
        queryRunner.query(
          `INSERT INTO profiles ("userId", profile_type, profile_id) VALUES (${row.userId}, '${type}', ${row.id});`,
        ),
      );
      p = p.then(() =>
        queryRunner.query(
          `SELECT id FROM profiles WHERE profile_type = '${type}' AND profile_id = ${row.id};`,
        ),
      );
      p = p.then((selected) => {
        const { id } = selected[0];
        return queryRunner.query(
          `UPDATE ${table} SET "profileId" = ${id} WHERE id = ${row.id}`,
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
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    await queryRunner.dropForeignKey(table, foreignKey);

    // 6. Удаленеи userId

    await queryRunner.dropColumn(table, 'userId');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. Добавление userId

    const userColumn = new TableColumn({
      name: 'userId',
      type: 'int',
      isNullable: true,
    });
    await queryRunner.addColumn(table, userColumn);

    // 2. Заполнение userId

    await queryRunner.query(
      `UPDATE ${table} SET "userId" = (SELECT "userId" FROM profiles WHERE id = ${table}."profileId");`,
    );

    // 3. Снятие nullable у userId

    userColumn.isNullable = false;
    await queryRunner.changeColumn(table, 'userId', userColumn);

    // 4. Создание первичного ключа у userId

    await queryRunner.createForeignKey(
      table,
      new TableForeignKey({
        columnNames: ['userId'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
      }),
    );

    // 5. Сброс первичного ключа на таблицу профилей

    await queryRunner.dropForeignKey(table, fk);

    // 6. Удаление столбца первичного ключа профилей

    await queryRunner.dropColumn(table, 'profileId');

    // 7. Удаление записей о профилях

    await queryRunner.query(
      `DELETE FROM profiles WHERE profile_type='${type}'`,
    );
  }
}
