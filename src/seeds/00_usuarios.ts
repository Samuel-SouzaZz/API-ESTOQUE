import type { Knex } from 'knex';
import bcrypt from 'bcryptjs';

/**
 * Seed para preencher a tabela de Usuários com dados iniciais de teste
 */
export async function seed(knex: Knex): Promise<void> {
  // Limpa a tabela antes de inserir
  await knex('usuarios').del();
  
  // Criptografa senhas para os usuários de teste
  const senhaHasheada = await bcrypt.hash('123456', 10);
  
  // Insere os dados de usuários para teste
  await knex('usuarios').insert([
    {
      nome: 'Administrador do Sistema',
      email: 'admin@sistema.com',
      senha: senhaHasheada,
      role: 'ADMIN',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Dr. Carlos Silva',
      email: 'carlos.medico@hospital.com',
      senha: senhaHasheada,
      role: 'MEDICO',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Ana Paula Farmacêutica',
      email: 'ana.farmaceutica@farmacia.com',
      senha: senhaHasheada,
      role: 'FARMACEUTICO',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'João Paciente Silva',
      email: 'joao.paciente@email.com',
      senha: senhaHasheada,
      role: 'PACIENTE',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Dra. Maria Cardiologista',
      email: 'maria.medica@hospital.com',
      senha: senhaHasheada,
      role: 'MEDICO',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      nome: 'Roberto Farmacêutico',
      email: 'roberto.farmaceutico@farmacia.com',
      senha: senhaHasheada,
      role: 'FARMACEUTICO',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
} 