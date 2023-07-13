import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRefreshTokensTable1688993223958 implements MigrationInterface {
  name = 'CreateRefreshTokensTable1688993223958';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "refreshTokens" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "token" character varying NOT NULL, "userId" integer NOT NULL, "accessTokenId" integer NOT NULL, CONSTRAINT "REL_c5e1b67ddd1678ed7d482e39a2" UNIQUE ("accessTokenId"), CONSTRAINT "PK_c4a0078b846c2c4508473680625" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "refreshTokens" ADD CONSTRAINT "FK_265bec4e500714d5269580a0219" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "refreshTokens" ADD CONSTRAINT "FK_c5e1b67ddd1678ed7d482e39a2b" FOREIGN KEY ("accessTokenId") REFERENCES "accessTokens"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "refreshTokens" DROP CONSTRAINT "FK_c5e1b67ddd1678ed7d482e39a2b"',
    );
    await queryRunner.query(
      'ALTER TABLE "refreshTokens" DROP CONSTRAINT "FK_265bec4e500714d5269580a0219"',
    );
    await queryRunner.query('DROP TABLE "refreshTokens"');
  }
}
