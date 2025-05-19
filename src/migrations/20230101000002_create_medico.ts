import type { Knex } from 'knex';

/**
 * Migration para criar a tabela de Médicos
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('medicos', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('crm').notNullable().unique();
    table.string('especialidade');
    table.timestamps(true, true); // created_at e updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('medicos');
} 