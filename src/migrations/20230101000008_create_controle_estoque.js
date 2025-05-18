/**
 * Migration para criar a tabela de Controle de Estoque
 */
exports.up = function(knex) {
  return knex.schema.createTable('controle_estoque', function(table) {
    table.increments('id').primary();
    table.integer('estoque_id').unsigned().references('id').inTable('estoque');
    table.integer('medicamento_id').unsigned().references('id').inTable('medicamentos');
    table.integer('lote_id').unsigned().references('id').inTable('lotes');
    table.string('tipo_movimento').notNullable(); // ENTRADA, SAIDA, AJUSTE, DEVOLUCAO
    table.integer('quantidade').notNullable();
    table.integer('usuario_id').unsigned();
    table.integer('paciente_id').unsigned().references('id').inTable('pacientes');
    table.integer('medico_id').unsigned().references('id').inTable('medicos');
    table.date('data_movimento').notNullable().defaultTo(knex.fn.now());
    table.text('observacao');
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('controle_estoque');
}; 