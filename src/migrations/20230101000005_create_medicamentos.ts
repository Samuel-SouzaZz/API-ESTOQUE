import type { Knex } from 'knex';

/**
 * Migration para criar a tabela de Medicamentos
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('medicamentos', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('descricao');
    table.integer('fornecedor_id').unsigned().references('id').inTable('fornecedores');
    table.timestamps(true, true); // created_at e updated_at
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('medicamentos');
} 