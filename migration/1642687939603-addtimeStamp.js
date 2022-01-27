const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class addtimeStamp1642687939603 {
    name = 'addtimeStamp1642687939603'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`report\` ADD \`date\` int NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`report\` DROP COLUMN \`date\``);
    }
}
