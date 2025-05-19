import knex from 'knex';
import config from '../../knexfile';

// Determina qual ambiente usar
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = config[environment];

// Exporta a instância do Knex configurada
export const db = knex(connectionConfig);

// Exporta o config para uso em scripts
export default connectionConfig; 