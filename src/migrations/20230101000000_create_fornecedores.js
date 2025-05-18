/**
 * Migration para criar a tabela de Fornecedores
 */
exports.up = function(knex) {
  return knex.schema.createTable('fornecedores', function(table) {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('status').defaultTo('DISPONIVEL');
    table.string('telefone');
    table.timestamps(true, true); // created_at e updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('fornecedores');
}; 