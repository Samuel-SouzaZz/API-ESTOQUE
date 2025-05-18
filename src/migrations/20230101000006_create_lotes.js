/**
 * Migration para criar a tabela de Lotes
 */
exports.up = function(knex) {
  return knex.schema.createTable('lotes', function(table) {
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
};

exports.down = function(knex) {
  return knex.schema.dropTable('lotes');
}; 