import fs from 'fs/promises';
import path from 'path';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { FileEntity } from '../../dist/files/entities/file.entity';

const table = 'files';

export class MoveFiles1670147667759 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Копирование файлов

    const files: FileEntity[] = await queryRunner.query(`SELECT * FROM files;`);

    let p: Promise<null | void> = Promise.resolve(null);

    files.forEach((file) => {
      const baseName = path.basename(file.path);
      console.log('file', baseName);
      p = p.then(() => fs.copyFile(file.path, '/uploads/' + baseName));
      p = p.catch((error) => {
        console.log('error', error);
      });
    });
    await p;

    // Переименование имеющегося столбца
    await queryRunner.query(
      `ALTER TABLE ${table} RENAME COLUMN path TO path_old;`,
    );
    await queryRunner.query(
      `ALTER TABLE ${table} ALTER COLUMN path_old DROP NOT NULL;`,
    );

    // Создание столбца

    await queryRunner.addColumn(
      table,
      new TableColumn({
        name: 'path',
        type: 'varchar',
        isNullable: true,
      }),
    );

    // Заполнение столца

    await queryRunner.query(
      `UPDATE ${table} SET path = regexp_replace(path_old, '^.+/', '/uploads/')`,
    );

    // Сброс nullable
    await queryRunner.query(
      `ALTER TABLE ${table} ALTER COLUMN path SET NOT NULL;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(table, 'path');
    await queryRunner.query(
      `ALTER TABLE ${table} ALTER COLUMN path_old SET NOT NULL;`,
    );
    await queryRunner.query(
      `ALTER TABLE files RENAME COLUMN path_old TO path;`,
    );
  }
}
