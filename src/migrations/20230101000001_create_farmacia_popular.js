/**
 * Migration para criar a tabela de Farmácia Popular
 */
exports.up = function(knex) {
  return knex.schema.createTable('farmacia_popular', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('nome').notNullable();
    table.string('telefone');
    table.timestamps(true, true); // created_at e updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('farmacia_popular');
}; 