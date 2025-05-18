/**
 * Migration para criar a tabela de Médicos
 */
exports.up = function(knex) {
  return knex.schema.createTable('medicos', function(table) {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('crm').notNullable();
    table.string('especialidade');
    table.timestamps(true, true); // created_at e updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('medicos');
}; 