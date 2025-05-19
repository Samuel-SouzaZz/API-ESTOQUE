import knex from 'knex';
import config from '../../knexfile';

// Determina qual ambiente usar
const environment = process.env.NODE_ENV || 'development';
const connectionConfig = config[environment];

console.log(`Executando migrações no ambiente ${environment}...`);

// Cria uma instância do Knex
const db = knex(connectionConfig);

// Executa migrações e sementes
async function migrate() {
  try {
    // Executa as migrações
    console.log('Aplicando migrações...');
    await db.migrate.latest();
    console.log('Migrações aplicadas com sucesso!');
    
    // Finaliza a conexão
    await db.destroy();
    process.exit(0);
  } catch (error) {
    console.error('Erro ao executar migrações:', error);
    await db.destroy();
    process.exit(1);
  }
}

// Executa o script
migrate(); 