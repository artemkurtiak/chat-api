import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateGroupsTable1688999923518 implements MigrationInterface {
    name = 'UpdateGroupsTable1688999923518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" ADD "userId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "groups" ADD CONSTRAINT "FK_898cf6af34722df13f760cc364f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "groups" DROP CONSTRAINT "FK_898cf6af34722df13f760cc364f"`);
        await queryRunner.query(`ALTER TABLE "groups" DROP COLUMN "userId"`);
    }

}
