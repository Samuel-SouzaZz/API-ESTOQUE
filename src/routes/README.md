# Rotas da API

Este diretório contém a definição das rotas da API de Controle de Estoque de Medicamentos. As rotas determinam como os endpoints HTTP são mapeados para os controllers, incluindo sistema de autenticação e autorização baseado em roles.

## Estrutura

- **index.ts**: Arquivo principal que agrupa todas as rotas
- **authRoutes.ts**: Rotas para autenticação (login, register, verificação)
- **medicamentoRoutes.ts**: Rotas para operações com medicamentos
- **controleEstoqueRoutes.ts**: Rotas para operações de controle de estoque
- **loteRoutes.ts**: Rotas para operações com lotes de medicamentos
- **fornecedorRoutes.ts**: Rotas para gerenciamento de fornecedores
- **pacienteRoutes.ts**: Rotas para gerenciamento de pacientes
- **protectedExamples.ts**: Exemplos de rotas protegidas por role

## Sistema de User Roles

A API implementa um sistema de autorização baseado em roles:

- **ADMIN**: Acesso total ao sistema
- **MEDICO**: Pode prescrever medicamentos e gerenciar pacientes
- **FARMACEUTICO**: Pode dispensar medicamentos e controlar estoque
- **PACIENTE**: Acesso limitado aos próprios dados

## Rotas de Autenticação

| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|---------|
| POST | `/auth/register` | Registrar novo usuário | Público |
| POST | `/auth/login` | Login de usuário | Público |
| GET | `/auth/verify` | Verificar validade do token | Público |
| GET | `/auth/me` | Obter dados do usuário logado | Privado |

## Rotas de Medicamentos

| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|---------|
| GET | `/medicamentos` | Lista todos os medicamentos | Público |
| GET | `/medicamentos/:id` | Busca medicamento por ID | Público |
| POST | `/medicamentos` | Cria novo medicamento | Farmacêuticos e Admins |
| PUT | `/medicamentos/:id` | Atualiza medicamento | Farmacêuticos e Admins |
| DELETE | `/medicamentos/:id` | Remove medicamento | Apenas Admins |
| GET | `/medicamentos/busca/nome` | Busca por nome | Público |
| GET | `/medicamentos/fornecedor/:fornecedorId` | Busca por fornecedor | Público |

## Rotas de Controle de Estoque

| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|---------|
| GET | `/controle-estoque` | Lista todas as solicitações | Profissionais de saúde |
| GET | `/controle-estoque/:id` | Busca solicitação por ID | Profissionais de saúde |
| POST | `/controle-estoque` | Cria nova solicitação | Médicos e Admins |
| PUT | `/controle-estoque/:id` | Atualiza solicitação | Médicos e Admins |
| DELETE | `/controle-estoque/:id` | Remove solicitação | Apenas Admins |
| PATCH | `/controle-estoque/:id/status` | Atualiza status | Farmacêuticos e Admins |
| GET | `/controle-estoque/medico/:medicoId` | Busca por médico | Profissionais de saúde |
| GET | `/controle-estoque/paciente/:pacienteId` | Busca por paciente | Profissionais de saúde |
| GET | `/controle-estoque/busca/status` | Busca por status | Profissionais de saúde |
| GET | `/controle-estoque/relatorio` | Gera relatório | Profissionais de saúde |

## Rotas de Lotes

| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|---------|
| GET | `/lotes` | Lista todos os lotes | Profissionais de saúde |
| GET | `/lotes/:id` | Busca lote por ID | Profissionais de saúde |
| POST | `/lotes` | Cria novo lote | Farmacêuticos e Admins |
| PUT | `/lotes/:id` | Atualiza lote | Farmacêuticos e Admins |
| DELETE | `/lotes/:id` | Remove lote | Apenas Admins |
| GET | `/lotes/produto/:produtoId` | Busca por produto | Profissionais de saúde |
| GET | `/lotes/busca/vencidos` | Busca lotes vencidos | Profissionais de saúde |
| GET | `/lotes/busca/proximos-vencimento` | Próximos ao vencimento | Profissionais de saúde |
| GET | `/lotes/:id/verificar-vencimento` | Verifica vencimento | Profissionais de saúde |

## Rotas de Fornecedores

| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|---------|
| GET | `/fornecedores` | Lista todos os fornecedores | Público |
| GET | `/fornecedores/:id` | Busca fornecedor por ID | Público |
| POST | `/fornecedores` | Cria novo fornecedor | Farmacêuticos e Admins |
| PUT | `/fornecedores/:id` | Atualiza fornecedor | Farmacêuticos e Admins |
| DELETE | `/fornecedores/:id` | Remove fornecedor | Apenas Admins |
| GET | `/fornecedores/busca/nome` | Busca por nome | Público |
| GET | `/fornecedores/status/:status` | Busca por status | Público |

## Rotas de Pacientes

| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|---------|
| GET | `/pacientes` | Lista todos os pacientes | Profissionais de saúde |
| GET | `/pacientes/:id` | Busca paciente por ID | Profissionais de saúde |
| POST | `/pacientes` | Cria novo paciente | Médicos e Admins |
| PUT | `/pacientes/:id` | Atualiza paciente | Médicos e Admins |
| DELETE | `/pacientes/:id` | Remove paciente | Apenas Admins |
| GET | `/pacientes/busca/nome` | Busca por nome | Profissionais de saúde |

## Rotas Protegidas de Exemplo

| Método | Endpoint | Descrição | Acesso |
|--------|----------|-----------|---------|
| GET | `/protected/admin` | Área administrativa | Apenas Admins |
| GET | `/protected/medico` | Área médica | Médicos e Admins |
| GET | `/protected/farmaceutico` | Área farmacêutica | Farmacêuticos e Admins |
| GET | `/protected/profissionais` | Área profissionais | Médicos, Farmacêuticos e Admins |
| GET | `/protected/paciente` | Área do paciente | Qualquer usuário autenticado |
| GET | `/protected/usuarios` | Lista usuários com permissões | Usuários autenticados |

## Autenticação

Para acessar rotas protegidas, inclua o token JWT no header:

```
Authorization: Bearer <seu_token_jwt>
```

## Filtros e Paginação

Os endpoints de listagem suportam os seguintes query parameters:

- **page**: Número da página (padrão: 1)
- **limit**: Itens por página (padrão: 10)
- **sortBy**: Campo para ordenação
- **order**: Direção da ordenação (asc/desc)
- **Filtros específicos**: Dependem do endpoint

Exemplo:
```
GET /medicamentos?page=2&limit=20&sortBy=nome&order=asc
```

## Códigos de Status HTTP

- **200**: Sucesso
- **201**: Criado com sucesso
- **400**: Erro de validação
- **401**: Não autenticado
- **403**: Sem permissão
- **404**: Não encontrado
- **500**: Erro interno do servidor

## Estrutura de Resposta

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

## Exemplos de Requisição

### Login
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "medico@exemplo.com",
  "senha": "senha123"
}
```

### Criar Medicamento (requer autenticação)
```bash
POST /medicamentos
Authorization: Bearer <token>
Content-Type: application/json

{
  "nome": "Medicamento Exemplo",
  "descricao": "Descrição do medicamento",
  "fornecedor": "uuid-do-fornecedor",
  "quantidade": 100
}
```

### Criar Solicitação de Estoque (requer autenticação)
```bash
POST /controle-estoque
Authorization: Bearer <token>
Content-Type: application/json

{
  "medicamento": "uuid-do-medicamento",
  "medico": "uuid-do-medico",
  "paciente": "uuid-do-paciente",
  "quantidade": 10,
  "observacao": "Prescrição para tratamento"
}
``` 