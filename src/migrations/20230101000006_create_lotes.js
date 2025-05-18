/**
 * Migration para criar a tabela de Lotes
 */
exports.up = function(knex) {
  return knex.schema.createTable('lotes', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('codigo').notNullable().unique();
    table.uuid('produto_id').notNullable().references('id').inTable('medicamentos');
    table.date('data_fabricacao').notNullable();
    table.date('data_validade').notNullable();
    table.integer('quantidade').notNullable().defaultTo(0);
    table.uuid('fornecedor_id').references('id').inTable('fornecedores');
    table.text('observacoes');
    table.timestamps(true, true); // created_at e updated_at
    
    // Índices para otimização
    table.index('codigo');
    table.index('produto_id');
    table.index('data_validade');
    table.index('fornecedor_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('lotes');
}; 