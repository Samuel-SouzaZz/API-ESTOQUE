import dotenv from 'dotenv';

dotenv.config();

// Interface para configuração da conexão com banco de dados
export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username?: string;
  password?: string;
}

// Obtém a configuração do banco de dados a partir das variáveis de ambiente
export const getDatabaseConfig = (): DatabaseConfig => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/estoque-medicamentos';
  
  // Verifica se a URI do MongoDB está no formato padrão
  const match = mongoUri.match(/mongodb:\/\/(?:([^:]+):([^@]+)@)?([^:]+)(?::(\d+))?\/(.+)/);
  
  if (match) {
    const [, username, password, host, port, database] = match;
    
    return {
      host,
      port: port ? parseInt(port, 10) : 27017,
      database,
      username,
      password
    };
  }
  
  // Configuração padrão
  return {
    host: 'localhost',
    port: 27017,
    database: 'estoque-medicamentos'
  };
};

// Função de inicialização da conexão com o banco de dados
// Esta função seria substituída pela configuração do mecanismo de migrations
const connectDB = async (): Promise<void> => {
  try {
    const config = getDatabaseConfig();
    console.log(`Configuração de banco de dados carregada para ${config.database}`);
    // Aqui seria implementada a conexão com o banco de dados usando migrations
  } catch (error: any) {
    console.error(`Erro na configuração do banco de dados: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB; 