/**
 * Migration para criar a tabela de Médicos
 */
exports.up = function(knex) {
  return knex.schema.createTable('medicos', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('nome').notNullable();
    table.timestamps(true, true); // created_at e updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('medicos');
}; 