import { OpenAI } from "langchain/llms/openai";
import { SqlDatabase } from "langchain/sql_db";
import { createSqlAgent, SqlToolkit } from "langchain/agents";
import { SqlDatabaseChain } from "langchain/chains";
import { DataSource } from "typeorm";

/** This example uses Chinook database, which is a sample database available for SQL Server, Oracle, MySQL, etc.
 * To set it up follow the instructions on https://database.guide/2-sample-databases-sqlite/, placing the .db file
 * in the examples folder.
 */

export class DBReader {
  public datasource: DataSource;
  public toolkit: any;
  public model: any;
  public executor: any;
  public db: any;
  public chain: any;

  constructor() {
    this.datasource = new DataSource({
      type: "postgres",
      host: "database",
      port: 5432,
      username: "postgres",
      password: "postgrespassword",
      database: "employeemanagement",
    });
  }

  public async init() {
    this.db = await SqlDatabase.fromDataSourceParams({
      appDataSource: this.datasource,
    });

    this.model = new OpenAI({ temperature: 0 });
    this.chain = new SqlDatabaseChain({ llm: this.model, database: this.db });
    // this.toolkit = new SqlToolkit(this.db);
    console.log("Init has been called!!");
  }

  public async run(query: string) {
    const result = await this.chain.run(query);
    return result;
  }
}
