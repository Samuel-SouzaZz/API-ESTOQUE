import type { Knex } from 'knex';

/**
 * Seed para preencher a tabela de Médicos com dados iniciais
 */
export async function seed(knex: Knex): Promise<void> {
  // Limpa a tabela antes de inserir
  await knex('medicos').del();
  
  // Insere os dados
  await knex('medicos').insert([
    {
      id: 1,
      nome: 'Dr. Carlos Silva',
      crm: '12345-SP',
      especialidade: 'Clínico Geral',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      nome: 'Dra. Ana Ferreira',
      crm: '23456-RJ',
      especialidade: 'Cardiologia',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      nome: 'Dr. Paulo Santos',
      crm: '34567-MG',
      especialidade: 'Neurologia',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      nome: 'Dra. Mariana Costa',
      crm: '45678-RS',
      especialidade: 'Pediatria',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
} 