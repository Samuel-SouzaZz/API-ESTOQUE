/**
 * Migration para criar a tabela de Fornecedores
 */
exports.up = function(knex) {
  return knex.schema.createTable('fornecedores', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('nome').notNullable();
    table.enum('status', ['DISPONIVEL', 'INDISPONIVEL']).defaultTo('DISPONIVEL');
    table.string('telefone');
    table.timestamps(true, true); // created_at e updated_at
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('fornecedores');
}; 