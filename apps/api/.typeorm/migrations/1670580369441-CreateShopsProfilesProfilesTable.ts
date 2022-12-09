import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const table = 'shops_manager_profiles_profiles';
const sequence = 'shops_profiles_profiles_seq';
const unique = 'UNIQUE_SHOP_ID_PROFILE_ID';

export class CreateShopsProfilesProfilesTable1670580369441
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SEQUENCE ${sequence} INCREMENT 1 START 1;`);
    await queryRunner.createTable(
      new Table({
        name: table,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            default: `nextval('${sequence}')`,
          },
          {
            name: 'shopsId',
            type: 'int',
          },
          {
            name: 'profilesId',
            type: 'int',
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
        uniques: [
          {
            name: unique,
            columnNames: ['shopsId', 'profilesId'],
          },
        ],
      }),
    );
    await queryRunner.query(
      `INSERT INTO ${table} ("shopsId", "profilesId")
       SELECT shops.id AS "shopId", (SELECT profiles.id FROM profiles WHERE profile_type = 'shop_manager' LIMIT 1) as "profileId"
       FROM shops;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(table, true, true, true);
    await queryRunner.query(`DROP SEQUENCE ${sequence};`);
  }
}
