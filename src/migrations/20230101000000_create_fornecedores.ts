import type { Knex } from 'knex';

/**
 * Migration para criar a tabela de Fornecedores
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('fornecedores', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('status').defaultTo('DISPONIVEL');
    table.string('telefone');
    table.timestamps(true, true); // created_at e updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('fornecedores');
} 