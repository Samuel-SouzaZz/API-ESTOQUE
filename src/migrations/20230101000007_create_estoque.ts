import type { Knex } from 'knex';

/**
 * Migration para criar a tabela de Estoque
 */
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('estoque', (table: Knex.TableBuilder) => {
    table.increments('id').primary();
    table.integer('medicamento_id').unsigned().references('id').inTable('medicamentos');
    table.integer('lote_id').unsigned().references('id').inTable('lotes');
    table.integer('quantidade_disponivel').unsigned().notNullable().defaultTo(0);
    table.integer('quantidade_minima').unsigned().defaultTo(10);
    table.string('localizacao');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('estoque');
} 