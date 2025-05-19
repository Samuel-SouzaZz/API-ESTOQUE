/**
 * Configuração da conexão com o banco de dados
 * Exporta uma instância do Knex configurada com base no ambiente
 */

import dotenv from 'dotenv';
import knex, { Knex } from 'knex';
import config from '../../knexfile';

dotenv.config();

// Determina o ambiente com base na variável NODE_ENV
const environment = process.env.NODE_ENV || 'development';

// Função para inicializar conexão com o banco de dados
const connectDB = async (): Promise<void> => {
  try {
    // Obtém a configuração para o ambiente atual
    const knexConfig = config[environment];
    
    if (!knexConfig) {
      throw new Error(`Configuração para ambiente "${environment}" não encontrada`);
    }
    
    // Mensagem de log com base no tipo de conexão
    if (environment === 'development') {
      console.log(`Conectando ao banco de dados SQLite no ambiente "${environment}"`);
    } else {
      console.log(`Conectando ao banco de dados PostgreSQL no ambiente "${environment}"`);
    }
    
    // Inicializa a conexão com o banco de dados
    const db = knex(knexConfig);
    
    // Testa a conexão
    await db.raw('SELECT 1');
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    
    return Promise.resolve();
  } catch (error: any) {
    console.error('Erro ao conectar com o banco de dados:', error.message);
    return Promise.reject(error);
  }
};

// Exporta a função de conexão
export default connectDB;

// Cria e exporta a instância do Knex
export const db = knex(config[environment]); 