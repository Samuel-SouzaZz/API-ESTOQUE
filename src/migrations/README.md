# Migrations

Esta pasta contém as migrations da API de Controle de Estoque de Medicamentos. As migrations servem para versionar a estrutura do banco de dados, permitindo criar, alterar e desfazer mudanças de forma controlada.

## Conceito das Migrations

Conforme estudado na matéria, migrations são scripts que:

- **Versionam a estrutura do banco**: Cada migration é numerada sequencialmente
- **Registram mudanças**: Criar tabelas, alterar colunas, adicionar índices
- **Permitem rollback**: Função `down` para desfazer a mudança
- **Funcionam como histórico**: Saber qual alteração gerou um problema

## Estrutura dos Arquivos

Cada migration segue o padrão estudado:

```typescript
export async function up(knex: Knex): Promise<void> {
  // Faz a mudança (criar tabela, alterar coluna, etc.)
}

export async function down(knex: Knex): Promise<void> {
  // Desfaz a mudança (dropar tabela, remover coluna, etc.)
}
```

## Migrations Implementadas

### Ordem de Execução (conforme numeração):

1. **20230101000000_create_fornecedores.ts** - Tabela de fornecedores
2. **20230101000001_create_farmacia_popular.ts** - Tabela farmácia popular  
3. **20230101000002_create_medico.ts** - Tabela de médicos
4. **20230101000003_create_paciente.ts** - Tabela de pacientes
5. **20230101000004_create_farmaceutico.ts** - Tabela de farmacêuticos
6. **20230101000005_create_medicamentos.ts** - Tabela de medicamentos
7. **20230101000006_create_lotes.ts** - Tabela de lotes
8. **20230101000007_create_estoque.ts** - Tabela de estoque
9. **20230101000008_create_controle_estoque.ts** - Tabela controle de estoque
10. **20230101000009_create_usuarios.ts** - Tabela de usuários (autenticação)

## Detalhes das Tabelas

### usuarios
```sql
- id (PRIMARY KEY)
- nome (NOT NULL)
- email (UNIQUE, NOT NULL)
- senha (NOT NULL) 
- role (DEFAULT 'PACIENTE') -- ADMIN, MEDICO, FARMACEUTICO, PACIENTE
- created_at, updated_at
```

### medicamentos
```sql
- id (PRIMARY KEY)
- nome (NOT NULL)
- descricao
- fornecedor_id (FOREIGN KEY)
- created_at, updated_at
```

### controle_estoque
```sql
- id (PRIMARY KEY)
- estoque_id (FOREIGN KEY)
- medicamento_id (FOREIGN KEY)
- lote_id (FOREIGN KEY)
- tipo_movimento (ENTRADA, SAIDA, AJUSTE, DEVOLUCAO)
- quantidade (NOT NULL)
- usuario_id, paciente_id, medico_id
- data_movimento, observacao
- created_at, updated_at
```

## Comandos Knex (conforme matéria)

### Executar migrations:
```bash
npx knex migrate:latest
```

### Desfazer última migration:
```bash
npx knex migrate:rollback
```

### Status das migrations:
```bash
npx knex migrate:status
```

### Criar nova migration:
```bash
npx knex migrate:make nome_da_migration
```

## Relacionamentos Implementados

- **medicamentos** → **fornecedores** (many-to-one)
- **lotes** → **medicamentos** (many-to-one)  
- **controle_estoque** → **medicamentos** (many-to-one)
- **controle_estoque** → **pacientes** (many-to-one)
- **controle_estoque** → **medicos** (many-to-one)
- **controle_estoque** → **lotes** (many-to-one)

## User Roles Sistema

As migrations implementam o sistema de roles conforme estudado:

- **ADMIN**: Administrador do sistema
- **MEDICO**: Médico prescrevente  
- **FARMACEUTICO**: Farmacêutico dispensador
- **PACIENTE**: Paciente do sistema (padrão)

## Boas Práticas Aplicadas

✅ **Nomenclatura clara**: `create_usuarios`, `create_medicamentos`  
✅ **Timestamps**: `created_at` e `updated_at` em todas as tabelas  
✅ **Chaves primárias**: `id` auto-incrementável  
✅ **Foreign keys**: Relacionamentos definidos  
✅ **Comentários**: Documentação do propósito  
✅ **Rollback**: Função `down` implementada  

## Ambiente de Desenvolvimento

As migrations são executadas automaticamente no ambiente de desenvolvimento (SQLite), conforme configurado no `knexfile.ts`. 