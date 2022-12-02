import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedMastersImg1669624578863 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE masters SET "imgId" = (SELECT id FROM files WHERE masters.img LIKE CONCAT('%',files.originalname,'%') AND files.path LIKE '%masters%' );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE masters SET "imgId" = -1; 
    `);
  }
}
