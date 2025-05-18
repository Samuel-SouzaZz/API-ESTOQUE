/**
 * Migration para criar a tabela de Medicamentos
 */
exports.up = function(knex) {
  return knex.schema.createTable('medicamentos', function(table) {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('principio_ativo').notNullable();
    table.string('dosagem');
    table.string('forma_farmaceutica');
    table.integer('fornecedor_id').unsigned().references('id').inTable('fornecedores');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('medicamentos');
}; 