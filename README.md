# API de Controle de Estoque de Medicamentos

Esta é uma API REST desenvolvida em Node.js com TypeScript para controle de estoque de medicamentos.

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset do JavaScript
- **Express** - Framework web
- **Knex.js** - Query builder SQL
- **SQLite** - Banco de dados (desenvolvimento)
- **PostgreSQL** - Banco de dados (produção)

## 📋 Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd API-ESTOQUE
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Execute as migrations para criar as tabelas:
```bash
npm run migrate
```

5. (Opcional) Execute os seeds para popular o banco:
```bash
npm run seed
```

## 🚀 Como executar

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm run build
npm start
```

## 📚 Endpoints da API

### Medicamentos
- `GET /api/medicamentos` - Lista todos os medicamentos
- `GET /api/medicamentos/:id` - Busca medicamento por ID
- `POST /api/medicamentos` - Cria novo medicamento
- `PUT /api/medicamentos/:id` - Atualiza medicamento
- `DELETE /api/medicamentos/:id` - Remove medicamento
- `GET /api/medicamentos/search?nome=` - Busca por nome
- `GET /api/medicamentos/fornecedor/:fornecedorId` - Busca por fornecedor

### Fornecedores
- `GET /api/fornecedores` - Lista todos os fornecedores
- `GET /api/fornecedores/:id` - Busca fornecedor por ID
- `POST /api/fornecedores` - Cria novo fornecedor
- `PUT /api/fornecedores/:id` - Atualiza fornecedor
- `DELETE /api/fornecedores/:id` - Remove fornecedor

### Lotes
- `GET /api/lotes` - Lista todos os lotes
- `GET /api/lotes/:id` - Busca lote por ID
- `POST /api/lotes` - Cria novo lote
- `PUT /api/lotes/:id` - Atualiza lote
- `DELETE /api/lotes/:id` - Remove lote

### Controle de Estoque
- `GET /api/controle-estoque` - Lista movimentações
- `GET /api/controle-estoque/:id` - Busca movimentação por ID
- `POST /api/controle-estoque` - Cria nova movimentação
- `PUT /api/controle-estoque/:id` - Atualiza movimentação
- `DELETE /api/controle-estoque/:id` - Remove movimentação

### Pacientes
- `GET /api/pacientes` - Lista todos os pacientes
- `GET /api/pacientes/:id` - Busca paciente por ID
- `POST /api/pacientes` - Cria novo paciente
- `PUT /api/pacientes/:id` - Atualiza paciente
- `DELETE /api/pacientes/:id` - Remove paciente

## 🗄️ Estrutura do Banco de Dados

### Tabelas principais:
- **fornecedores** - Dados dos fornecedores
- **medicamentos** - Catálogo de medicamentos
- **lotes** - Lotes de medicamentos
- **estoque** - Controle de estoque atual
- **controle_estoque** - Histórico de movimentações
- **pacientes** - Dados dos pacientes
- **medicos** - Dados dos médicos
- **farmaceuticos** - Dados dos farmacêuticos

## 🧪 Testes

```bash
npm test
```

## 📝 Scripts Disponíveis

- `npm run dev` - Executa em modo desenvolvimento
- `npm run build` - Compila o TypeScript
- `npm start` - Executa a versão compilada
- `npm run migrate` - Executa migrations
- `npm run migrate:rollback` - Desfaz última migration
- `npm run seed` - Executa seeds

## 🔒 Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure:

```env
PORT=5000
NODE_ENV=development

# Banco de dados
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=estoque_medicamentos_dev
```

## ✅ Status do Projeto

- ✅ Estrutura básica da API
- ✅ Models e interfaces
- ✅ Controllers implementados
- ✅ Rotas configuradas
- ✅ Migrations criadas
- ✅ Configuração do banco de dados
- ✅ Validações básicas
- ✅ Tratamento de erros

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.
