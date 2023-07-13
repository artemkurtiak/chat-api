import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAccessTokensTable1688993223953 implements MigrationInterface {
  name = 'CreateAccessTokensTable1688993223953';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "accessTokens" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "token" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_e12415ce383ed3981d282bdeceb" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "accessTokens" ADD CONSTRAINT "FK_30ac6efcab2a24adb6ed3246330" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "accessTokens" DROP CONSTRAINT "FK_30ac6efcab2a24adb6ed3246330"',
    );
    await queryRunner.query('DROP TABLE "accessTokens"');
  }
}
