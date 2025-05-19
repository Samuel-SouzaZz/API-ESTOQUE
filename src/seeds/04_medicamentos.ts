import type { Knex } from 'knex';

/**
 * Seed para preencher a tabela de Medicamentos com dados iniciais
 */
export async function seed(knex: Knex): Promise<void> {
  // Limpa a tabela antes de inserir
  await knex('medicamentos').del();
  
  // Insere os dados
  await knex('medicamentos').insert([
    {
      id: 1,
      nome: 'Paracetamol 500mg',
      descricao: 'Analgésico e antitérmico',
      fornecedor_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      nome: 'Amoxicilina 500mg',
      descricao: 'Antibiótico',
      fornecedor_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      nome: 'Dipirona 1g',
      descricao: 'Analgésico e antitérmico',
      fornecedor_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      nome: 'Omeprazol 20mg',
      descricao: 'Inibidor da bomba de prótons',
      fornecedor_id: 3,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 5,
      nome: 'Losartana 50mg',
      descricao: 'Anti-hipertensivo',
      fornecedor_id: 2,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 6,
      nome: 'Atenolol 25mg',
      descricao: 'Betabloqueador',
      fornecedor_id: 1,
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
} 