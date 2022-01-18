const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initialSchema1642542057851 {
    name = 'initialSchema1642542057851'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`admin\` tinyint NOT NULL DEFAULT 1, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`report\` (\`id\` int NOT NULL AUTO_INCREMENT, \`approved\` tinyint NOT NULL DEFAULT 0, \`price\` int NOT NULL, \`make\` varchar(255) NOT NULL, \`model\` varchar(255) NOT NULL, \`year\` int NOT NULL, \`lng\` int NOT NULL, \`lat\` int NOT NULL, \`mileage\` int NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`report\` ADD CONSTRAINT \`FK_e347c56b008c2057c9887e230aa\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE \`report\` DROP FOREIGN KEY \`FK_e347c56b008c2057c9887e230aa\``);
        await queryRunner.query(`DROP TABLE \`report\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }
}
