import pg from "pg";
import fs from "fs";
import dotenv from "dotenv";

export default async function ConnectToDatabase(config) {
  // 1 - connect to postgres (admin connection)
  const adminClient = new pg.Client({
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    host: config.DATABASE_HOST,
    port: 5432,
    database: "postgres",
  });

  try {
    await adminClient.connect();

    // 2 - check if database exists
    const result = await adminClient.query(
      `SELECT 1 FROM pg_database WHERE datname='${config.DATABASE_NAME}'`
    );

    if (result.rowCount === 0) {
      console.log(`Database "${dbName}" not found. Creating...`);
      await adminClient.query(`CREATE DATABASE ${dbName}`);
      console.log(`Database "${dbName}" created successfully`);
    } else {
      const db = new pg.Pool({
        user: config.DATABASE_USER,
        password: config.DATABASE_PASSWORD,
        host: config.DATABASE_HOST,
        port: 5432,
        database: config.DATABASE_NAME,
      });
      return db;
    }
  } catch (err) {
    console.error("Admin connection error:", err);
    process.exit(1);
  } finally {
    await adminClient.end();
  }

  // 3 - connect to your new database
  const client = new pg.Client({
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    host: config.DATABASE_HOST,
    port: 5432,
    database: config.DATABASE_NAME,
  });

  try {
    await client.connect();
    console.log(`Connected to database "${config.DATABASE_NAME}"`);

    // 4 - apply schema
    const schema = fs.readFileSync("./database.sql", "utf8");
    await client.query(schema);
    console.log("Schema applied successfully");

    const db = new pg.Pool({
      user: config.DATABASE_USER,
      password: config.DATABASE_PASSWORD,
      host: config.DATABASE_HOST,
      port: 5432,
      database: config.DATABASE_NAME,
    });
    return db;
  } catch (err) {
    console.error("Main DB connection error:", err);
  }
}
