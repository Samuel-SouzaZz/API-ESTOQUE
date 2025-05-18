/**
 * Migration para criar a tabela de Farmacêuticos
 */
exports.up = function(knex) {
  return knex.schema.createTable('farmaceuticos', function(table) {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('crf').notNullable();
    table.timestamps(true, true); // created_at e updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('farmaceuticos');
}; 