import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class TaskTable1727374545294 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'task',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                  default: 'uuid_generate_v4()',
                  isNullable: false
                },
                {
                  name: 'title',
                  type: 'varchar(256)',
                  isNullable: false
                },
                {
                    name: 'description',
                    type: 'varchar(512)',
                    isNullable: false
                },
                {
                    name: 'status',
                    type: 'varchar(50)',
                    default: "'TO_DO'",
                    isNullable: false
                },
                {
                    name: 'expiration_date',
                    type: 'timestamptz',
                    isNullable: false
                }
              ],
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS task;`)
    }

}
