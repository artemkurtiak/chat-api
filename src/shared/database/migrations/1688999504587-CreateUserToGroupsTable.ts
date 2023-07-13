import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserToGroupsTable1688999504587 implements MigrationInterface {
  name = 'CreateUserToGroupsTable1688999504587';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "userToGroups" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "PK_0c7ce63ac1ca82e5f42b64a06f6" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "userToGroups" ADD CONSTRAINT "FK_e95567b15cbf5ee25eb7f90d8f8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "userToGroups" ADD CONSTRAINT "FK_6edbd999fcd6834e38003c7bcd1" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "userToGroups" DROP CONSTRAINT "FK_6edbd999fcd6834e38003c7bcd1"',
    );
    await queryRunner.query(
      'ALTER TABLE "userToGroups" DROP CONSTRAINT "FK_e95567b15cbf5ee25eb7f90d8f8"',
    );
    await queryRunner.query('DROP TABLE "userToGroups"');
  }
}
