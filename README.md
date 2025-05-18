# API de Controle de Estoque de Medicamentos

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Versão](https://img.shields.io/badge/versão-1.0.0-blue)
![Licença](https://img.shields.io/badge/licença-MIT-green)

Uma API REST moderna para gerenciamento completo de estoque de medicamentos em ambientes hospitalares e farmacêuticos, desenvolvida com TypeScript, Express e PostgreSQL.

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
  ├── migrations/       # Migrations do banco de dados (Knex.js)
  ├── seeds/            # Seeds para dados iniciais do banco
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
- **Banco de Dados**: PostgreSQL
- **ORM/Query Builder**: Knex.js
- **Gerenciamento de Dependências**: npm

## 📡 API Endpoints

### Medicamentos
- `GET /medicamentos`: Lista todos os medicamentos
- `GET /medicamentos/:id`: Busca um medicamento por ID
- `POST /medicamentos`: Cria um novo medicamento
- `PUT /medicamentos/:id`: Atualiza um medicamento existente
- `DELETE /medicamentos/:id`: Remove um medicamento
- `GET /medicamentos/nome/:nome`: Busca medicamentos por nome
- `GET /medicamentos/fornecedor/:id`: Busca medicamentos por fornecedor

### Lotes
- `GET /lotes`: Lista todos os lotes
- `GET /lotes/:id`: Busca um lote por ID
- `POST /lotes`: Cria um novo lote
- `PUT /lotes/:id`: Atualiza um lote existente
- `DELETE /lotes/:id`: Remove um lote
- `GET /lotes/produto/:id`: Busca lotes por produto
- `GET /lotes/vencidos`: Busca lotes vencidos 
- `GET /lotes/proximos-vencimento/:dias`: Busca lotes próximos do vencimento

### Controle de Estoque
- `GET /controle-estoque`: Lista todas as solicitações
- `GET /controle-estoque/:id`: Busca uma solicitação por ID
- `POST /controle-estoque`: Cria uma nova solicitação
- `PUT /controle-estoque/:id`: Atualiza uma solicitação existente
- `PUT /controle-estoque/:id/status`: Atualiza o status de uma solicitação
- `GET /controle-estoque/medico/:id`: Busca solicitações por médico
- `GET /controle-estoque/paciente/:id`: Busca solicitações por paciente

## 🛠️ Requisitos

- Node.js (v14+)
- PostgreSQL (v12+)
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

# Configurações do banco de dados
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=estoque_medicamentos_dev
```

Crie o banco de dados e habilite a extensão UUID:
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
- `npm run migrate`: Executa as migrations pendentes
- `npm run migrate:rollback`: Reverte a última migration
- `npm run seed`: Popula o banco com dados iniciais

## 🗄️ Estrutura do Banco de Dados

### Migrations (src/migrations/)
```
20230101000000_create_fornecedores.js
20230101000001_create_farmacia_popular.js
20230101000002_create_medico.js
20230101000003_create_paciente.js
20230101000004_create_farmaceutico.js
20230101000005_create_medicamentos.js
20230101000006_create_lotes.js
20230101000007_create_estoque.js
20230101000008_create_controle_estoque.js
```

### Seeds para Dados Iniciais (src/seeds/)
```
01_fornecedores.js
02_medicos.js
03_pacientes.js
04_medicamentos.js
```

## 🔍 Comandos Úteis do Knex

### Migrations
```bash
# Criar uma nova migration
npx knex migrate:make nome_da_migration

# Executar migrations pendentes
npx knex migrate:latest

# Reverter última batch de migrations
npx knex migrate:rollback
```

### Seeds
```bash
# Criar um novo seed
npx knex seed:make nome_do_seed

# Executar todos os seeds
npx knex seed:run

# Executar um seed específico
npx knex seed:run --specific=seed-name.js
```

## 📝 Documentação Adicional

Para mais detalhes sobre os componentes específicos do sistema, consulte:

- [Documentação de Controllers](src/controllers/README.md)
- [Documentação de Services](src/services/README.md)
- [Documentação de Repositórios](src/repositorio/README.md)
- [Documentação de Rotas](src/routes/README.md)

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor, sinta-se à vontade para abrir issues e pull requests.
