import pkg from 'pg';
import {DATABASE_URL} from '../../config.js';
const { Pool } = pkg;

export const postgreSQLClient = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    require: true,
  }
});
