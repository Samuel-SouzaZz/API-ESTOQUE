import knex from 'knex';
import config from '../../knexfile';

// Determina qual ambiente usar
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = config[environment];

console.log(`Executando seeds no ambiente ${environment}...`);

// Cria uma instância do Knex
const db = knex(connectionConfig);

// Executa migrações e sementes
async function seed() {
  try {
    // Executa as seeds
    console.log('Aplicando seeds...');
    await db.seed.run();
    console.log('Seeds aplicadas com sucesso!');
    
    // Finaliza a conexão
    await db.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Erro ao executar seeds:', error);
    await db.destroy();
    process.exit(1);
  }
}

// Executa o script
seed(); 