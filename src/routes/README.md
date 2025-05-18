# Rotas da API

Este diretório contém a definição das rotas da API de Controle de Estoque de Medicamentos. As rotas determinam como os endpoints HTTP são mapeados para os controllers.

## Estrutura

- **index.ts**: Arquivo principal que agrupa todas as rotas
- **medicamentoRoutes.ts**: Rotas para operações com medicamentos
- **controleEstoqueRoutes.ts**: Rotas para operações de controle de estoque
- **loteRoutes.ts**: Rotas para operações com lotes de medicamentos

## Rotas Disponíveis

### Medicamentos

- `GET /medicamentos`: Lista todos os medicamentos
- `GET /medicamentos/:id`: Busca um medicamento por ID
- `POST /medicamentos`: Cria um novo medicamento
- `PUT /medicamentos/:id`: Atualiza um medicamento existente
- `DELETE /medicamentos/:id`: Remove um medicamento
- `GET /medicamentos/nome/:nome`: Busca medicamentos por nome
- `GET /medicamentos/fornecedor/:id`: Busca medicamentos por fornecedor

### Controle de Estoque

- `GET /controle-estoque`: Lista todas as solicitações
- `GET /controle-estoque/:id`: Busca uma solicitação por ID
- `POST /controle-estoque`: Cria uma nova solicitação
- `PUT /controle-estoque/:id`: Atualiza uma solicitação existente
- `DELETE /controle-estoque/:id`: Remove uma solicitação
- `PUT /controle-estoque/:id/status`: Atualiza o status de uma solicitação
- `GET /controle-estoque/medico/:id`: Busca solicitações por médico
- `GET /controle-estoque/paciente/:id`: Busca solicitações por paciente
- `GET /controle-estoque/estoque/:id`: Busca solicitações por estoque
- `GET /controle-estoque/status/:status`: Busca solicitações por status
- `GET /controle-estoque/relatorio`: Gera relatório de solicitações por período

### Lotes

- `GET /lotes`: Lista todos os lotes de medicamentos
- `GET /lotes/:id`: Busca um lote por ID
- `POST /lotes`: Cria um novo lote
- `PUT /lotes/:id`: Atualiza um lote existente
- `DELETE /lotes/:id`: Remove um lote
- `GET /lotes/produto/:id`: Busca lotes por produto (medicamento)
- `GET /lotes/vencidos`: Busca lotes vencidos 
- `GET /lotes/proximos-vencimento/:dias`: Busca lotes próximos do vencimento
- `GET /lotes/:id/vencido`: Verifica se um lote específico está vencido

## Parâmetros das Requisições

### POST /medicamentos

```json
{
  "nome": "Medicamento exemplo",
  "descricao": "Descrição opcional",
  "fornecedor": "ID do fornecedor",
  "quantidade": 100
}
```

### POST /controle-estoque

```json
{
  "medicamento": "ID do medicamento",
  "medico": "ID do médico",
  "paciente": "ID do paciente",
  "quantidade": 10,
  "observacao": "Observação opcional"
}
```

### PUT /controle-estoque/:id/status

```json
{
  "status": "CONCLUIDO" // Valores possíveis: RESERVADO, CONCLUIDO, CANCELADO
}
```

### POST /lotes

```json
{
  "codigo": "LOTE123",
  "produto": "ID do medicamento",
  "dataFabricacao": "2023-01-01",
  "dataValidade": "2025-01-01",
  "quantidade": 500,
  "fornecedor": "ID do fornecedor",
  "observacoes": "Observações opcionais"
}
```

## Respostas da API

### Sucesso

```json
{
  "success": true,
  "message": "Operação realizada com sucesso",
  "data": { ... }
}
```

### Erro

```json
{
  "success": false,
  "message": "Descrição do erro",
  "error": "Detalhes do erro (opcional)"
}
```

## Configuração das Rotas

As rotas são configuradas utilizando o Express Router e registradas no arquivo index.ts:

```typescript
import { Router } from 'express';
import medicamentoRoutes from './medicamentoRoutes';
import controleEstoqueRoutes from './controleEstoqueRoutes';
import loteRoutes from './loteRoutes';

const router = Router();

router.use('/medicamentos', medicamentoRoutes);
router.use('/controle-estoque', controleEstoqueRoutes);
router.use('/lotes', loteRoutes);

export default router;
``` 