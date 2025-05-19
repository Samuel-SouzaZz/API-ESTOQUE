import type { Knex } from 'knex';

/**
 * Migration para criar a tabela de Farmacêuticos
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('farmaceuticos', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('crf').notNullable();
    table.timestamps(true, true); // created_at e updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('farmaceuticos');
} 