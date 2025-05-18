/**
 * Migration para criar a tabela de Estoque
 */
exports.up = function(knex) {
  return knex.schema.createTable('estoque', function(table) {
    table.increments('id').primary();
    table.integer('medicamento_id').unsigned().references('id').inTable('medicamentos');
    table.integer('lote_id').unsigned().references('id').inTable('lotes');
    table.integer('quantidade_disponivel').unsigned().notNullable().defaultTo(0);
    table.integer('quantidade_minima').unsigned().defaultTo(10);
    table.string('localizacao');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('estoque');
}; 