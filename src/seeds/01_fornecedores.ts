import type { Knex } from 'knex';

/**
 * Seed para preencher a tabela de Fornecedores com dados iniciais
 */
export async function seed(knex: Knex): Promise<void> {
  // Limpa a tabela antes de inserir
  await knex('fornecedores').del();
  
  // Insere os dados
  await knex('fornecedores').insert([
    {
      nome: 'Farmacêutica Nacional',
      status: 'DISPONIVEL',
      telefone: '(11) 3555-1234',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Distribuidora Medicamentos Brasil',
      status: 'DISPONIVEL',
      telefone: '(21) 2233-4567',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Pharma Plus',
      status: 'DISPONIVEL',
      telefone: '(31) 3444-5678',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Med Supply',
      status: 'INDISPONIVEL',
      telefone: '(41) 4111-8989',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
} 