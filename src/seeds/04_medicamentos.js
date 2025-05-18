/**
 * Seed para preencher a tabela de Medicamentos com dados iniciais
 */
const { v4: uuidv4 } = require('uuid');

exports.seed = async function(knex) {
  // Limpa a tabela antes de inserir
  await knex('medicamentos').del();
  
  // Busca os IDs dos fornecedores
  const fornecedores = await knex('fornecedores').select('id', 'nome');
  
  if (fornecedores.length === 0) {
    console.warn('Nenhum fornecedor encontrado. Execute o seed de fornecedores antes.');
    return;
  }
  
  // Mapeamento para fácil acesso pelo nome
  const fornecedorMap = {};
  fornecedores.forEach(f => {
    fornecedorMap[f.nome] = f.id;
  });
  
  // Insere os dados
  await knex('medicamentos').insert([
    {
      id: uuidv4(),
      nome: 'Dipirona 500mg',
      fornecedor_id: fornecedorMap['Farmacêutica Nacional'],
      tarja: 'SEM_TARJA',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      nome: 'Paracetamol 750mg',
      fornecedor_id: fornecedorMap['Farmacêutica Nacional'],
      tarja: 'SEM_TARJA',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      nome: 'Amoxicilina 500mg',
      fornecedor_id: fornecedorMap['Distribuidora Medicamentos Brasil'],
      tarja: 'VERMELHA',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      nome: 'Omeprazol 20mg',
      fornecedor_id: fornecedorMap['Pharma Plus'],
      tarja: 'VERMELHA',
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      id: uuidv4(),
      nome: 'Rivotril 2mg',
      fornecedor_id: fornecedorMap['Distribuidora Medicamentos Brasil'],
      tarja: 'PRETA',
      created_at: new Date(),
      updated_at: new Date()
    }
  ]);
}; 