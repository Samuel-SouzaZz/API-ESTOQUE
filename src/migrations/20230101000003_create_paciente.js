/**
 * Migration para criar a tabela de Pacientes
 */
exports.up = function(knex) {
  return knex.schema.createTable('pacientes', function(table) {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('cpf').notNullable();
    table.string('telefone');
    table.timestamps(true, true); // created_at e updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('pacientes');
}; 