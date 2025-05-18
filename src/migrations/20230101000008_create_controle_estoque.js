/**
 * Migration para criar a tabela de Controle de Estoque
 */
exports.up = function(knex) {
  return knex.schema.createTable('controle_estoque', function(table) {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('medico_id').notNullable().references('id').inTable('medicos');
    table.uuid('paciente_id').notNullable().references('id').inTable('pacientes');
    table.uuid('estoque_id').notNullable().references('id').inTable('estoque');
    table.integer('quantidade').notNullable().defaultTo(1);
    table.enum('status', ['RESERVADO', 'CONCLUIDO', 'CANCELADO']).defaultTo('RESERVADO');
    table.timestamp('data_solicitacao').defaultTo(knex.fn.now());
    table.timestamp('data_atualizacao').defaultTo(knex.fn.now());
    table.timestamps(true, true); // created_at e updated_at
    
    // Índices para otimização
    table.index('medico_id');
    table.index('paciente_id');
    table.index('estoque_id');
    table.index('status');
    table.index('data_solicitacao');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('controle_estoque');
}; 