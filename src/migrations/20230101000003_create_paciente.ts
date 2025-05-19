import type { Knex } from 'knex';

/**
 * Migration para criar a tabela de Pacientes
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('pacientes', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('cpf').notNullable().unique();
    table.date('data_nascimento');
    table.timestamps(true, true); // created_at e updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('pacientes');
} 