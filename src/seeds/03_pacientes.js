/**
 * Seed para preencher a tabela de Pacientes com dados iniciais
 */
const { v4: uuidv4 } = require('uuid');

exports.seed = async function(knex) {
  // Limpa a tabela antes de inserir
  await knex('pacientes').del();
  
  // Insere os dados
  await knex('pacientes').insert([
    {
      id: uuidv4(),
      nome: 'João Almeida',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      nome: 'Mariana Costa',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      nome: 'Pedro Henrique',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      nome: 'Juliana Martins',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      nome: 'Roberto Lima',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      nome: 'Fernanda Rocha',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}; 