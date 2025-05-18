/**
 * Seed para preencher a tabela de Fornecedores com dados iniciais
 */
const { v4: uuidv4 } = require('uuid');

exports.seed = async function(knex) {
  // Limpa a tabela antes de inserir
  await knex('fornecedores').del();
  
  // Insere os dados
  await knex('fornecedores').insert([
    {
      id: uuidv4(),
      nome: 'Farmacêutica Nacional',
      status: 'DISPONIVEL',
      telefone: '(11) 3555-1234',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      nome: 'Distribuidora Medicamentos Brasil',
      status: 'DISPONIVEL',
      telefone: '(21) 2233-4567',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      nome: 'Pharma Plus',
      status: 'DISPONIVEL',
      telefone: '(31) 3444-5678',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      nome: 'Med Supply',
      status: 'INDISPONIVEL',
      telefone: '(41) 4111-8989',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}; 