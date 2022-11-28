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
    await queryRunner.query(`
      INSERT INTO "files" ("originalname", "path", "mimetype", "size", "created_at", "updated_at") VALUES
      ('marina_svetlova.png',	'/uploads/masters/e4acebbd-6fe0-451b-ba7d-8ad7a9d80d2e.png',	'image/png',	91835,	'2022-11-28 08:06:30.956804',	'2022-11-28 08:06:30.956804'),
      ('nataliya_petrova.png',	'/uploads/masters/19ccf800-e81b-46ff-9757-a756d299231e.png',	'image/png',	85952,	'2022-11-28 08:06:36.856849',	'2022-11-28 08:06:36.856849'),
      ('svetlana_ivanova.png',	'/uploads/masters/1f1fa895-3075-4bbf-b119-97852d7088c8.png',	'image/png',	64589,	'2022-11-28 08:06:41.980842',	'2022-11-28 08:06:41.980842'),
      ('shop_image_1.png',	'/uploads/shops/7a405c54-64c1-4525-a2bf-31a82442e167.png',	'image/png',	228341,	'2022-11-28 08:10:42.096651',	'2022-11-28 08:10:42.096651'),
      ('shop_image_2.png',	'/uploads/shops/913631b9-d181-4ff7-ae57-4d33694f422d.png',	'image/png',	222030,	'2022-11-28 08:10:51.941245',	'2022-11-28 08:10:51.941245'),
      ('shop_image_3.png',	'/uploads/shops/bd02f81a-6a98-415f-bf75-fc98b0ebcbad.png',	'image/png',	211160,	'2022-11-28 08:10:58.662369',	'2022-11-28 08:10:58.662369'),
      ('marina_svetlova.png',	'/uploads/users/f00bed1b-a00f-4acb-b584-285ab746a797.png',	'image/png',	17309,	'2022-11-28 08:15:08.8751',	'2022-11-28 08:15:08.8751');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('files');
    await queryRunner.query(`DROP SEQUENCE files_id_seq;`);
  }
}
