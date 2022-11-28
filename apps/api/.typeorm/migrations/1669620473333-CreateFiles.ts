import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateFiles1669620473333 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE SEQUENCE files_id_seq INCREMENT 1 START 1;`,
    );
    await queryRunner.createTable(
      new Table({
        name: 'files',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            default: `nextval('files_id_seq')`,
          },
          {
            name: 'originalname',
            type: 'varchar',
          },
          {
            name: 'path',
            type: 'varchar',
          },
          {
            name: 'mimetype',
            type: 'varchar',
          },
          {
            name: 'size',
            type: 'integer',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('files');
    await queryRunner.query(`DROP SEQUENCE files_id_seq;`);
  }
}
