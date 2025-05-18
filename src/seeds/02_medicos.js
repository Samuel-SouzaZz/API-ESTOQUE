/**
 * Seed para preencher a tabela de Médicos com dados iniciais
 */
const { v4: uuidv4 } = require('uuid');

exports.seed = async function(knex) {
  // Limpa a tabela antes de inserir
  await knex('medicos').del();
  
  // Insere os dados
  await knex('medicos').insert([
    {
      id: uuidv4(),
      nome: 'Dr. Ricardo Silva',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      nome: 'Dra. Maria Oliveira',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      nome: 'Dr. Carlos Santos',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      nome: 'Dra. Ana Pereira',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      nome: 'Dr. Paulo Ferreira',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}; 