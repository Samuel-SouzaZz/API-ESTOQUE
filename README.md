# API de Controle de Estoque de Medicamentos

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Versão](https://img.shields.io/badge/versão-1.0.0-blue)
![Licença](https://img.shields.io/badge/licença-MIT-green)

Uma API REST moderna para gerenciamento completo de estoque de medicamentos em ambientes hospitalares e farmacêuticos, desenvolvida com TypeScript, Express e suporte para SQLite (desenvolvimento) e PostgreSQL (produção).

## 📋 Sobre o Projeto

Esta API fornece uma solução completa para o controle de estoque de medicamentos, permitindo:

- Gerenciamento de medicamentos e suas informações
- Controle de lotes e validades
- Gestão de estoque em diferentes locais
- Rastreamento de solicitações de medicamentos
- Controle de dispensação para pacientes

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas, baseada no padrão MVC com adaptações para melhorar a separação de responsabilidades:

```
src/
  ├── config/           # Configurações do projeto e conexão com o banco
  ├── controllers/      # Controladores para endpoints HTTP
  ├── models/           # Modelos e interfaces de dados
  ├── routes/           # Definição das rotas da API
  ├── services/         # Lógica de negócios
  ├── repositorio/      # Camada de acesso a dados (DAO/Repository)
  ├── middlewares/      # Middlewares do Express
  ├── utils/            # Funções utilitárias
  ├── migrations/       # Migrations do banco de dados (Knex.js) em TypeScript
  ├── seeds/            # Seeds para dados iniciais do banco em TypeScript
  ├── types/            # Definições de tipos TypeScript
  ├── scripts/          # Scripts utilitários
  └── server.ts         # Ponto de entrada da aplicação
```

## 📊 Modelos de Dados

### Medicamento
- **Nome**: Nome comercial do medicamento
- **Fornecedor**: Empresa que fornece o medicamento
- **Tarja**: Classificação do medicamento (Sem Tarja, Amarela, Vermelha, Preta)

### Lote
- **Código**: Identificação única do lote
- **Produto**: Referência ao medicamento
- **Data de Fabricação**: Quando o lote foi produzido
- **Data de Validade**: Prazo de validade do lote
- **Quantidade**: Número de unidades no lote
- **Fornecedor**: Quem forneceu o lote específico
- **Observações**: Informações adicionais

### Estoque
- **Local**: Onde o medicamento está armazenado
- **Lote**: Referência ao lote do medicamento
- **Quantidade**: Quantidade disponível neste local

### Controle de Estoque
- **Médico**: Quem solicitou o medicamento
- **Paciente**: Para quem o medicamento foi solicitado
- **Estoque**: De onde o medicamento será retirado
- **Quantidade**: Quantidade solicitada
- **Status**: Estado da solicitação (Reservado, Concluído, Cancelado)

## 🔄 Fluxos Principais

### Solicitação de Medicamentos
1. Médico solicita medicamento para um paciente
2. Sistema verifica disponibilidade em estoque
3. Reserva o medicamento com status "Reservado"
4. Farmacêutico separa e dispensa o medicamento
5. Status é atualizado para "Concluído"

### Controle de Validade
1. Sistema identifica lotes próximos ao vencimento
2. Prioriza o uso destes lotes (FEFO - First Expire, First Out)
3. Bloqueia a dispensação de lotes vencidos
4. Gera alertas para lotes a vencer em X dias

## 🚀 Tecnologias

- **Backend**: Node.js, Express, TypeScript
- **Banco de Dados**: SQLite (desenvolvimento), PostgreSQL (produção)
- **ORM/Query Builder**: Knex.js
- **Gerenciamento de Dependências**: npm

## 📡 API Endpoints

### Medicamentos
- `GET /api/medicamentos`: Lista todos os medicamentos
- `GET /api/medicamentos/:id`: Busca um medicamento por ID
- `POST /api/medicamentos`: Cria um novo medicamento
- `PUT /api/medicamentos/:id`: Atualiza um medicamento existente
- `DELETE /api/medicamentos/:id`: Remove um medicamento
- `GET /api/medicamentos/busca/nome`: Busca medicamentos por nome
- `GET /api/medicamentos/fornecedor/:id`: Busca medicamentos por fornecedor

### Lotes
- `GET /api/lotes`: Lista todos os lotes
- `GET /api/lotes/:id`: Busca um lote por ID
- `POST /api/lotes`: Cria um novo lote
- `PUT /api/lotes/:id`: Atualiza um lote existente
- `DELETE /api/lotes/:id`: Remove um lote
- `GET /api/lotes/produto/:id`: Busca lotes por produto
- `GET /api/lotes/vencidos`: Busca lotes vencidos 
- `GET /api/lotes/proximos-vencimento/:dias`: Busca lotes próximos do vencimento

### Controle de Estoque
- `GET /api/controle-estoque`: Lista todas as solicitações
- `GET /api/controle-estoque/:id`: Busca uma solicitação por ID
- `POST /api/controle-estoque`: Cria uma nova solicitação
- `PUT /api/controle-estoque/:id`: Atualiza uma solicitação existente
- `PUT /api/controle-estoque/:id/status`: Atualiza o status de uma solicitação
- `GET /api/controle-estoque/medico/:id`: Busca solicitações por médico
- `GET /api/controle-estoque/paciente/:id`: Busca solicitações por paciente

### Fornecedores
- `GET /api/fornecedores`: Lista todos os fornecedores
- `GET /api/fornecedores/:id`: Busca um fornecedor por ID 
- `POST /api/fornecedores`: Cria um novo fornecedor
- `PUT /api/fornecedores/:id`: Atualiza um fornecedor existente
- `DELETE /api/fornecedores/:id`: Remove um fornecedor
- `GET /api/fornecedores/busca/nome`: Busca fornecedores por nome
- `GET /api/fornecedores/status/:status`: Busca fornecedores por status

### Pacientes
- `GET /api/pacientes`: Lista todos os pacientes
- `GET /api/pacientes/:id`: Busca um paciente por ID
- `POST /api/pacientes`: Cria um novo paciente
- `PUT /api/pacientes/:id`: Atualiza um paciente existente
- `DELETE /api/pacientes/:id`: Remove um paciente
- `GET /api/pacientes/busca/nome`: Busca pacientes por nome

## 🛠️ Requisitos

- Node.js (v14+)
- PostgreSQL (v12+) para ambiente de produção
- npm ou yarn

## ⚙️ Instalação e Configuração

### 1. Preparação do Ambiente

Clone o repositório e instale as dependências:
```bash
git clone https://github.com/seu-usuario/estoque-medicamentos-api.git
cd estoque-medicamentos-api
npm install
```

### 2. Configuração do Banco de Dados

Crie o arquivo de variáveis de ambiente:
```bash
cp .env.example .env
```

Configure as variáveis no arquivo `.env`:
```
# Configurações da aplicação
PORT=5000
NODE_ENV=development

# Configurações do banco de dados - Desenvolvimento (SQLite é usado por padrão)
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=estoque_medicamentos_dev

# Configurações do banco de dados - Produção
PROD_DB_HOST=seu_host
PROD_DB_USER=seu_usuario
PROD_DB_PASSWORD=sua_senha
PROD_DB_NAME=estoque_medicamentos_prod
```

Para PostgreSQL, crie o banco de dados e habilite a extensão UUID:
```sql
CREATE DATABASE estoque_medicamentos_dev;
\c estoque_medicamentos_dev
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

### 3. Criação da Estrutura do Banco

Execute as migrations para criar as tabelas:
```bash
npm run migrate
```

Popule o banco com dados iniciais:
```bash
npm run seed
```

### 4. Iniciar o Servidor

Para desenvolvimento:
```bash
npm run dev
```

Para produção:
```bash
npm run build
npm start
```

## 📦 Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento
- `npm run build`: Compila o projeto TypeScript
- `npm start`: Inicia o servidor em produção
- `npm test`: Executa os testes
- `npm run migrate`: Executa as migrations pendentes via knex
- `npm run migrate:ts`: Executa as migrations via script TypeScript
- `npm run migrate:rollback`: Reverte a última migration
- `npm run seed`: Executa seeds via knex
- `npm run seed:ts`: Executa seeds via script TypeScript

## 🗄️ Estrutura do Banco de Dados

### Migrations (src/migrations/)
```
20230101000000_create_fornecedores.ts
20230101000001_create_farmacia_popular.ts
20230101000002_create_medico.ts
20230101000003_create_paciente.ts
20230101000004_create_farmaceutico.ts
20230101000005_create_medicamentos.ts
20230101000006_create_lotes.ts
20230101000007_create_estoque.ts
20230101000008_create_controle_estoque.ts
```

### Seeds para Dados Iniciais (src/seeds/)
```
01_fornecedores.ts
02_medicos.ts
03_pacientes.ts
04_medicamentos.ts
```

## 🔍 Comandos Úteis do Knex com TypeScript

### Migrations
```bash
# Criar uma nova migration
npx knex migrate:make nome_da_migration

# Executar migrations pendentes
npm run migrate

# Reverter última batch de migrations
npm run migrate:rollback
```

### Seeds
```bash
# Criar um novo seed
npx knex seed:make nome_do_seed

# Executar todos os seeds
npm run seed

# Executar um seed específico
npx knex seed:run --specific=seed-name.ts --knexfile knexfile.ts
```

## 📝 Documentação Adicional

Para mais detalhes sobre os componentes específicos do sistema, consulte:

- [Documentação de Controllers](src/controllers/README.md)
- [Documentação de Services](src/services/README.md)
- [Documentação de Repositórios](src/repositorio/README.md)
- [Documentação de Rotas](src/routes/README.md)

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor, sinta-se à vontade para abrir issues e pull requests.
