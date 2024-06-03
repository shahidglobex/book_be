import { Kysely, MysqlDialect } from "kysely";
import { DB } from "kysely-codegen";
import { appConfig } from "../../config";
import { createPool } from "mysql2";

export const kysely = new Kysely<DB>({
  dialect: new MysqlDialect({
    pool: createPool({
      host: appConfig.DB_HOST,
      user: appConfig.DB_USER,
      database: appConfig.DB_NAME,
      password: appConfig.DB_PASSWORD,
      port: appConfig.DB_PORT || 3306,
      waitForConnections: true,
      connectionLimit: appConfig.MAX_POOL_CONNECTIONS || 10,
      queueLimit: 0,
    }),
  }),
  log(event) {
    if (event.level === "query") {
      console.log(event.query.sql);
      console.log(event.query.parameters);
    }
  },
});
