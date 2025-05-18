# Serviços de Negócios

Este diretório contém as implementações dos serviços que encapsulam a lógica de negócios da API de Controle de Estoque de Medicamentos. Os serviços atuam como uma camada intermediária entre os controllers e os repositórios, implementando validações, regras de negócio e orquestrando operações complexas.

## Estrutura

- **BaseService.ts**: Interface genérica que define as operações básicas que todos os serviços devem implementar.
- **MedicamentoService.ts**: Serviço para gerenciamento de medicamentos.
- **ControleEstoqueService.ts**: Serviço para gerenciamento de solicitações de medicamentos.
- **LoteService.ts**: Serviço para gerenciamento de lotes de medicamentos.
- **index.ts**: Arquivo de exportação que facilita o acesso aos serviços.

## Principais Funcionalidades

### BaseService

Interface que define os métodos básicos para todos os serviços:

- `findAll()`: Busca todos os registros
- `findById(id)`: Busca um registro pelo ID
- `create(data)`: Cria um novo registro
- `update(id, data)`: Atualiza um registro existente
- `delete(id)`: Remove um registro

### MedicamentoService

Implementa lógica de negócios para gerenciamento de medicamentos:

- Métodos básicos CRUD (com validações)
- `findByNome(nome)`: Busca medicamentos por nome
- `findByFornecedor(fornecedorId)`: Busca medicamentos por fornecedor

### ControleEstoqueService

Implementa lógica de negócios para gerenciamento de solicitações de medicamentos:

- Métodos básicos CRUD (com validações)
- `atualizarStatus(id, status)`: Atualiza o status de uma solicitação e gerencia o estoque
- `findByMedico(medicoId)`: Busca solicitações por médico
- `findByPaciente(pacienteId)`: Busca solicitações por paciente
- `findByEstoque(estoqueId)`: Busca solicitações por estoque
- `findByStatus(status)`: Busca solicitações por status
- `relatorioSolicitacoesPorPeriodo(dataInicio, dataFim)`: Gera relatório de solicitações por período

### LoteService

Implementa lógica de negócios para gerenciamento de lotes de medicamentos:

- Métodos básicos CRUD (com validações)
- `findByProduto(produtoId)`: Busca lotes por produto
- `findLotesVencidos(dataReferencia)`: Busca lotes vencidos
- `findLotesProximosVencimento(diasLimite, dataReferencia)`: Busca lotes próximos do vencimento
- `verificarVencimento(id, dataReferencia)`: Verifica se um lote específico está vencido

## Validações Implementadas

### Medicamento

- O nome do medicamento é obrigatório
- O fornecedor do medicamento é obrigatório
- Verifica se o medicamento existe antes de atualizar ou excluir

### Controle de Estoque

- Médico é obrigatório e deve existir no sistema
- Paciente é obrigatório e deve existir no sistema
- Estoque é obrigatório e deve existir no sistema
- Quantidade deve ser maior que zero
- Verifica disponibilidade em estoque antes de criar solicitação
- Impede alteração de status de "Concluído" para "Reservado"
- Atualiza a quantidade em estoque quando uma solicitação muda de status

### Lote

- Código do lote é obrigatório e deve ser único
- Data de validade é obrigatória e deve ser válida
- Produto (medicamento) é obrigatório e deve existir no sistema
- Não permite excluir lotes que possuem itens em estoque
- Validação de datas para verificação de vencimento

## Uso

Para utilizar os serviços, você pode importá-los individualmente:

```typescript
import { MedicamentoService } from '../services/MedicamentoService';

const medicamentoService = new MedicamentoService();
```

Ou usar o objeto singleton exportado pelo arquivo index:

```typescript
import { services } from '../services';

// Acesso aos serviços
const { medicamentoService, loteService } = services;
```

## Fluxo de Solicitação de Medicamentos

O fluxo completo para solicitação de medicamentos implementado no serviço `ControleEstoqueService` segue estas etapas:

1. **Criação da solicitação**:
   - Validação dos dados (médico, paciente, estoque, quantidade)
   - Verificação da disponibilidade em estoque
   - Criação da solicitação com status "Reservado"

2. **Atualização de status**:
   - Para "Concluído": reduz a quantidade em estoque
   - Para "Cancelado": mantém o estoque inalterado
   - Regra: não permite voltar de "Concluído" para "Reservado"

## Fluxo de Controle de Validade

O fluxo para controle de validade de lotes implementado no serviço `LoteService` permite:

1. **Monitoramento de lotes vencidos**:
   - Busca lotes com data de validade anterior à data atual
   - Consultas para qualquer data de referência

2. **Alerta para lotes próximos do vencimento**:
   - Busca lotes que vencerão em X dias
   - Pode ser configurado para diferentes períodos de alerta
   - Facilita o uso prioritário de lotes com vencimento mais próximo 