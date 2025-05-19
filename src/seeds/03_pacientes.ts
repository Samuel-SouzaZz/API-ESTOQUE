import type { Knex } from 'knex';
import { v4 as uuidv4 } from "uuid";

/**
 * Seed para preencher a tabela de Pacientes com dados iniciais
 */
export async function seed(knex: Knex): Promise<void> {
  // Limpa a tabela antes de inserir
  await knex('pacientes').del();
  
  // Insere os dados
  await knex('pacientes').insert([
    {
      id: 1,
      nome: 'João da Silva',
      cpf: '123.456.789-00',
      data_nascimento: new Date('1980-05-15'),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 2,
      nome: 'Maria Oliveira',
      cpf: '987.654.321-00',
      data_nascimento: new Date('1992-10-20'),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 3,
      nome: 'Pedro Santos',
      cpf: '456.789.123-00',
      data_nascimento: new Date('1975-03-08'),
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: 4,
      nome: 'Ana Costa',
      cpf: '789.123.456-00',
      data_nascimento: new Date('2000-12-25'),
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
} 