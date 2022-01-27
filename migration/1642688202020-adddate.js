const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class adddate1642688202020 {
    name = 'adddate1642688202020'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`report\` ADD \`date\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`admin\` \`admin\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`report\` CHANGE \`approved\` \`approved\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`report\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`report\` ADD \`price\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`report\` DROP COLUMN \`lng\``);
        await queryRunner.query(`ALTER TABLE \`report\` ADD \`lng\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`report\` DROP COLUMN \`lat\``);
        await queryRunner.query(`ALTER TABLE \`report\` ADD \`lat\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`report\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`admin\` \`admin\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`report\` CHANGE \`approved\` \`approved\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`report\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`report\` ADD CONSTRAINT \`FK_e347c56b008c2057c9887e230aa\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`report\` DROP FOREIGN KEY \`FK_e347c56b008c2057c9887e230aa\``);
        await queryRunner.query(`ALTER TABLE \`report\` CHANGE \`userId\` \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`report\` CHANGE \`approved\` \`approved\` tinyint(1) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`admin\` \`admin\` tinyint(1) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`report\` CHANGE \`userId\` \`userId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`report\` DROP COLUMN \`lat\``);
        await queryRunner.query(`ALTER TABLE \`report\` ADD \`lat\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`report\` DROP COLUMN \`lng\``);
        await queryRunner.query(`ALTER TABLE \`report\` ADD \`lng\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`report\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`report\` ADD \`price\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`report\` CHANGE \`approved\` \`approved\` tinyint(1) NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`admin\` \`admin\` tinyint(1) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`report\` DROP COLUMN \`date\``);
    }
}
