import type { Knex } from 'knex';

/**
 * Migration para criar a tabela de Farmácia Popular
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('farmacia_popular', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('endereco').notNullable();
    table.timestamps(true, true); // created_at e updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('farmacia_popular');
} 