const dbConfig = {
  synchronize: true,
  migrations: ["migration/*.js"],
  cli: {
      migrationsDir: "migration"
  }
}

switch(process.env.NODE_ENV){
  case 'development':
    Object.assign(dbConfig,{
      type:'mysql',
      host: "localhost",
      port: 3306,
      username: "root",
      password: "Box2home.",
      database: "db",
      entities: ['**/*.entity.js'],
    });
    break
  case 'test':
    Object.assign(dbConfig,{
      type:'mysql',
      host: "localhost",
      port: 3306,
      username: "root",
      password: "Box2home.",
      database: "testdb",
      entities: ['**/*.entity.ts'],
      migrationsRun: true
    })
    break
  case 'production':
    Object.assign(dbConfig,{
      type:'postgres',
      url: process.env.DATABASE_URL,
      entities: ['**/*.entity.js'],
      migrationsRun: true,
      ssl: {
        rejectUnauthorized:false,
      }
    })
  default:
    throw new Error("unkown env")
}

module.exports = dbConfig