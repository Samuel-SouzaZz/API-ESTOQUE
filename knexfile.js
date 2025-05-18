// Arquivo de configuração do Knex.js
// Define as configurações de conexão com o banco de dados para diferentes ambientes

require('dotenv').config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  // Ambiente de desenvolvimento
  development: {
    client: 'pg', // PostgreSQL
    connection: {
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'estoque_medicamentos_dev',
      charset: 'utf8'
    },
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
    // Habilita o uso de UUIDs no PostgreSQL
    postProcessResponse: (result) => {
      return result;
    },
    wrapIdentifier: (value, origImpl) => {
      return origImpl(value);
    },
    // Habilita extensão uuid-ossp para geração de UUIDs no PostgreSQL
    // Esta linha deve ser executada no banco manualmente:
    // CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
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
