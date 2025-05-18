/**
 * Migration para criar a tabela de Estoque
 */
exports.up = function(knex) {
  return knex.schema.createTable('estoque', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('local').notNullable();
    table.uuid('lote_id').notNullable().references('id').inTable('lotes');
    table.integer('quantidade').notNullable().defaultTo(0);
    table.timestamps(true, true); // created_at e updated_at
    
    // Índices para otimização
    table.index('lote_id');
    table.index('local');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('estoque');
}; 