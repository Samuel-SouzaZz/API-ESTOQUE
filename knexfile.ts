import dotenv from 'dotenv';
import type { Knex } from 'knex';

dotenv.config();

const config: { [key: string]: Knex.Config } = {
  // Ambiente de desenvolvimento
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './src/seeds'
    },
    pool: {
      min: 2,
      max: 10
    },
    debug: process.env.NODE_ENV === 'development'
  },

  // Ambiente de teste
  test: {
    client: 'pg',
    connection: {
      host: process.env.TEST_DB_HOST || 'localhost',
      user: process.env.TEST_DB_USER || 'postgres',
      password: process.env.TEST_DB_PASSWORD || 'postgres',
      database: process.env.TEST_DB_NAME || 'estoque_medicamentos_test',
      charset: 'utf8'
    },
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './src/seeds/test'
    },
    pool: {
      min: 2,
      max: 10
    },
    debug: false
  },

  // Ambiente de produção
  production: {
    client: 'pg',
    connection: {
      host: process.env.PROD_DB_HOST,
      user: process.env.PROD_DB_USER,
      password: process.env.PROD_DB_PASSWORD,
      database: process.env.PROD_DB_NAME,
      ssl: { rejectUnauthorized: false }
    },
    migrations: {
      directory: './src/migrations'
    },
    seeds: {
      directory: './src/seeds'
    },
    pool: {
      min: 2,
      max: 20
    },
    debug: false
  }
};

export default config; 