# Repositórios de Dados

Este diretório contém as implementações dos repositórios para a API de Controle de Estoque de Medicamentos. Os repositórios são responsáveis pela camada de acesso a dados, abstraindo o armazenamento e a manipulação dos dados para as entidades do sistema.

## Estrutura

- **BaseRepository.ts**: Interface genérica que define as operações CRUD básicas que todos os repositórios devem implementar.
- **MedicamentoRepository.ts**: Repositório para gerenciamento de medicamentos.
- **EstoqueRepository.ts**: Repositório para gerenciamento do estoque.
- **ControleEstoqueRepository.ts**: Repositório para gerenciamento de solicitações de medicamentos.
- **LoteRepository.ts**: Repositório para gerenciamento de lotes de medicamentos.
- **MedicoRepository.ts**: Repositório para gerenciamento de médicos.
- **PacienteRepository.ts**: Repositório para gerenciamento de pacientes.
- **FornecedorRepository.ts**: Repositório para gerenciamento de fornecedores.
- **index.ts**: Arquivo de exportação que facilita o acesso aos repositórios.

## Principais Funcionalidades

### BaseRepository

Interface que define os métodos básicos para todos os repositórios:

- `findAll()`: Busca todos os registros
- `findById(id)`: Busca um registro pelo ID
- `create(data)`: Cria um novo registro
- `update(id, data)`: Atualiza um registro existente
- `delete(id)`: Remove um registro

### MedicamentoRepository

Implementa operações para gerenciamento de medicamentos:

- Métodos básicos CRUD
- `findByNome(nome)`: Busca medicamentos por nome
- `findByFornecedor(fornecedorId)`: Busca medicamentos por fornecedor

### EstoqueRepository

Implementa operações para gerenciamento de estoque:

- Métodos básicos CRUD
- `atualizarQuantidade(id, quantidade, isAdicao, isSubstituicao)`: Atualiza a quantidade em estoque
- `findByLote(loteId)`: Busca registros de estoque por lote
- `findByLocal(local)`: Busca registros de estoque pelo local de armazenamento
- `verificarDisponibilidade(id, quantidadeNecessaria)`: Verifica se há quantidade disponível em estoque

### ControleEstoqueRepository

Implementa operações para gerenciamento de solicitações de medicamentos:

- Métodos básicos CRUD
- `atualizarStatus(id, status)`: Atualiza o status de um controle de estoque
- `findByMedico(medicoId)`: Busca registros de controle de estoque por médico
- `findByPaciente(pacienteId)`: Busca registros de controle de estoque por paciente
- `findByEstoque(estoqueId)`: Busca registros de controle de estoque por estoque
- `findByStatus(status)`: Busca registros de controle de estoque por status
- `relatorioSolicitacoesPorPeriodo(dataInicio, dataFim)`: Gera um relatório de solicitações por período

### LoteRepository

Implementa operações para gerenciamento de lotes de medicamentos:

- Métodos básicos CRUD
- `findByProduto(produtoId)`: Busca lotes por produto
- `findByFornecedor(fornecedorId)`: Busca lotes por fornecedor
- `findByCodigo(codigo)`: Busca lotes pelo código
- `findLotesVencidos(dataReferencia)`: Busca lotes vencidos
- `findLotesProximosVencimento(diasLimite, dataReferencia)`: Busca lotes próximos do vencimento
- `findLotesDisponiveis(quantidadeMinima)`: Busca lotes com quantidade disponível acima de um mínimo
- `verificarVencimento(id, dataReferencia)`: Verifica se um lote específico está vencido
- `atualizarQuantidade(id, quantidade, operacao)`: Atualiza a quantidade de um lote com opções de substituir, adicionar ou subtrair

### MedicoRepository

Implementa operações para gerenciamento de médicos:

- Métodos básicos CRUD
- `findByNome(nome)`: Busca médicos por nome

### PacienteRepository

Implementa operações para gerenciamento de pacientes:

- Métodos básicos CRUD
- `findByNome(nome)`: Busca pacientes por nome

### FornecedorRepository

Implementa operações para gerenciamento de fornecedores:

- Métodos básicos CRUD
- `findByNome(nome)`: Busca fornecedores por nome
- `findByStatus(status)`: Busca fornecedores por status
- `atualizarStatus(id, status)`: Atualiza o status de um fornecedor

## Uso

Para utilizar os repositórios, você pode importá-los individualmente:

```typescript
import { MedicamentoRepository } from '../repositorio/MedicamentoRepository';

const medicamentoRepository = new MedicamentoRepository();
```

Ou usar o objeto singleton exportado pelo arquivo index:

```typescript
import { repositories } from '../repositorio';

// Acesso aos repositórios
const { 
  medicamentoRepository, 
  loteRepository,
  medicoRepository,
  pacienteRepository 
} = repositories;
```

## Fluxo de Solicitação de Medicamentos

1. Médico solicita medicamento para um paciente:
   ```typescript
   const novaReserva = await repositories.controleEstoqueRepository.create({
     medicoId: 'id-do-medico',
     pacienteId: 'id-do-paciente',
     estoqueId: 'id-do-estoque',
     quantidade: 1
   });
   ```

2. Farmacêutico verifica e dispensa o medicamento:
   ```typescript
   // Verifica disponibilidade
   const disponivel = await repositories.estoqueRepository.verificarDisponibilidade(
     estoqueId, quantidade
   );
   
   if (disponivel) {
     // Atualiza o estoque (reduz a quantidade)
     await repositories.estoqueRepository.atualizarQuantidade(
       estoqueId, quantidade, false
     );
     
     // Atualiza o status da solicitação para concluído
     await repositories.controleEstoqueRepository.atualizarStatus(
       controleId, StatusControleEstoque.Concluido
     );
   }
   ```

## Fluxo de Controle de Validade

Para controlar medicamentos próximos do vencimento:

```typescript
// Busca lotes que vencem nos próximos 30 dias
const lotesProximosVencimento = await repositories.loteRepository.findLotesProximosVencimento(30);

// Para cada lote próximo do vencimento, busque o estoque correspondente
for (const lote of lotesProximosVencimento) {
  const estoques = await repositories.estoqueRepository.findByLote(lote.id);
  
  // Aqui você pode implementar lógica para alertar sobre vencimento próximo
  // ou priorizar o uso destes medicamentos
}
```

## Gerenciamento de Quantidades em Lotes

O sistema permite o gerenciamento detalhado das quantidades em cada lote:

```typescript
// Adicionar quantidades a um lote (ex: recebimento de mais unidades do mesmo lote)
await repositories.loteRepository.atualizarQuantidade('id-do-lote', 50, 'adicionar');

// Subtrair quantidades de um lote (ex: dispensação de medicamentos)
await repositories.loteRepository.atualizarQuantidade('id-do-lote', 10, 'subtrair');

// Substituir a quantidade em um lote (ex: correção de inventário)
await repositories.loteRepository.atualizarQuantidade('id-do-lote', 75, 'substituir');
```

## Exemplo de Fluxo Completo

Abaixo está um exemplo completo de um fluxo de solicitação de medicamento por um médico para um paciente:

```typescript
// Importa os repositórios
import { repositories } from '../repositorio';

// Função assíncrona para simular o fluxo completo
async function fluxoSolicitacaoMedicamento() {
  // 1. Busca do médico pelo nome
  const medicos = await repositories.medicoRepository.findByNome('Dr. Silva');
  const medico = medicos[0];
  
  // 2. Busca do paciente pelo nome
  const pacientes = await repositories.pacienteRepository.findByNome('João');
  const paciente = pacientes[0];
  
  // 3. Busca do medicamento pelo nome
  const medicamentos = await repositories.medicamentoRepository.findByNome('Dipirona');
  const medicamento = medicamentos[0];
  
  // 4. Busca de lotes não vencidos para o medicamento
  const hoje = new Date();
  const lotes = await repositories.loteRepository.findByProduto(medicamento.id);
  const lotesValidos = lotes.filter(lote => !repositories.loteRepository.verificarVencimento(lote.id, hoje));
  
  if (lotesValidos.length === 0) {
    return { success: false, message: 'Não há lotes válidos disponíveis para este medicamento' };
  }
  
  // Seleciona o lote mais próximo do vencimento, mas ainda válido (FEFO - First Expire, First Out)
  const lotesSorteados = [...lotesValidos].sort((a, b) => a.dataValidade.getTime() - b.dataValidade.getTime());
  const loteSelecionado = lotesSorteados[0];
  
  // 5. Verifica disponibilidade no lote
  const quantidadeNecessaria = 1;
  if (loteSelecionado.quantidade < quantidadeNecessaria) {
    return { success: false, message: 'Quantidade insuficiente no lote selecionado' };
  }
  
  // 6. Busca estoque para o lote selecionado
  const estoques = await repositories.estoqueRepository.findByLote(loteSelecionado.id);
  
  if (estoques.length === 0) {
    return { success: false, message: 'Não há estoque disponível para este lote' };
  }
  
  const estoque = estoques[0];
  
  // 7. Cria a solicitação de medicamento (reserva)
  const controleEstoque = await repositories.controleEstoqueRepository.create({
    medicoId: medico.id,
    pacienteId: paciente.id,
    estoqueId: estoque.id,
    quantidade: quantidadeNecessaria
  });
  
  // 8. Reduz a quantidade no lote
  await repositories.loteRepository.atualizarQuantidade(loteSelecionado.id, quantidadeNecessaria, 'subtrair');
  
  return { 
    success: true, 
    message: 'Medicamento solicitado com sucesso', 
    data: { controleEstoque, lote: loteSelecionado } 
  };
}
``` 