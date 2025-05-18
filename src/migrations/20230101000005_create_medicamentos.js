/**
 * Migration para criar a tabela de Medicamentos
 */
exports.up = function(knex) {
  return knex.schema.createTable('medicamentos', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('nome').notNullable();
    table.uuid('fornecedor_id').references('id').inTable('fornecedores');
    table.enum('tarja', ['SEM_TARJA', 'AMARELA', 'VERMELHA', 'PRETA']).defaultTo('SEM_TARJA');
    table.timestamps(true, true); // created_at e updated_at
    
    // Índices para otimização
    table.index('nome');
    table.index('fornecedor_id');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('medicamentos');
}; 