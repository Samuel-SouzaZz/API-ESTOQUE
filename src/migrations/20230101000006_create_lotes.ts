import type { Knex } from 'knex';

/**
 * Migration para criar a tabela de Lotes
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('lotes', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.string('numero_lote').notNullable();
    table.integer('medicamento_id').unsigned().references('id').inTable('medicamentos');
    table.integer('quantidade').unsigned().notNullable();
    table.date('data_fabricacao').notNullable();
    table.date('data_validade').notNullable();
    table.decimal('preco_unitario', 10, 2).notNullable();
    table.string('status').defaultTo('DISPONIVEL');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('lotes');
} 