import pkg from 'pg';
const { Pool } = pkg;

export const postgreSQLClient = new Pool({
  connectionString: process.env.DATABASE_URL,
});

/*
const postgreSQL = neon(process.env.DATABASE_URL);
export const postgreSQLClient = (query) => postgreSQL`&{query}`;*/
