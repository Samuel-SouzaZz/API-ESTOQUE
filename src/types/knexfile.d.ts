declare module '../../knexfile' {
  import { Knex } from 'knex';
  
  const config: {
    [key: string]: Knex.Config;
  };
  
  export default config;
} 