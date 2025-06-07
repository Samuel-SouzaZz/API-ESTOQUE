# API de Controle de Estoque de Medicamentos

Sistema completo para gerenciamento de estoque farmacêutico com autenticação JWT e controle de acesso baseado em roles.

## 📊 **Status do Projeto: 100% COMPLETO ✅**

**Todos os componentes analisados, aprovados e funcionais (13/13)**

## 👥 **Informações do Projeto**

- **Disciplina:** Desenvolvimento Web Back-end I
- **Professor:** Thiago Goldoni Thomé
- **Data da Apresentação:** 09/06/2025
- **Data Limite Commit:** 08/06/2025 às 23h59min59s

## 🎯 **Sistema Implementado**

### **🔐 Autenticação JWT Completa**
- Sistema de registro e login
- Criptografia bcrypt (salt: 10)
- Tokens JWT seguros
- User roles: ADMIN, MEDICO, FARMACEUTICO, PACIENTE
- Hierarquia de permissões

### **🏥 Controle de Estoque Farmacêutico**
- Gestão de medicamentos com tarja
- Controle de lotes com validade
- Solicitações de medicamentos (Reservado → Concluído/Cancelado)
- Relatórios por status
- Alertas de vencimento

### **🔍 Sistema de Filtros**
- Medicamentos: por nome, fornecedor
- Controle Estoque: por médico, paciente, status
- Lotes: por produto, vencidos, próximos vencimento
- Fornecedores: por nome, status
- Pacientes/Médicos: por nome

## 🚀 **Tecnologias Utilizadas**

- **Node.js** com **TypeScript**
- **Express.js** - Framework web
- **Knex.js** - Query builder e migrations
- **JWT** - Autenticação e autorização
- **bcryptjs** - Criptografia de senhas
- **uuid** - Geração de IDs únicos
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Variáveis de ambiente

## 🏗️ **Arquitetura Completa**

```
📁 src/
├── 🖥️  server.ts           # ✅ Servidor Express
├── 📁 config/             # ✅ Configuração Knex multi-ambiente
├── 📁 middleware/         # ✅ Autenticação JWT + autorização
├── 📁 routes/             # ✅ Rotas com middlewares de segurança
├── 📁 controllers/        # ✅ 6 controllers CRUD
├── 📁 services/           # ✅ 6 services com lógica de negócio
├── 📁 repositorio/        # ✅ 8 repositórios + interface base
├── 📁 models/             # ✅ 10 modelos + 4 enums
├── 📁 dtos/               # ✅ DTOs padronizados
├── 📁 types/              # ✅ Tipagens TypeScript
├── 📁 migrations/         # ✅ 9 migrations de banco
├── 📁 seeds/              # ✅ Dados de teste
└── 📁 scripts/            # ✅ Scripts de migração/seed
```

## 📦 **Instalação e Execução**

```bash
# 1. Clone e instale dependências
git clone <url-do-repositorio>
cd API-ESTOQUE
npm install

# 2. Configure variáveis de ambiente
cp .env.example .env
# Edite o arquivo .env conforme necessário

# 3. Execute migrations e seeds
npm run migrate
npm run seed

# 4. Inicie o servidor
npm run dev
```

## 🔐 **Autenticação e Autorização**

### **Usuários de Teste (senha: 123456)**
```javascript
// ADMIN - Acesso total
admin@sistema.com

// MEDICO - Prescrições e consultas
carlos.medico@hospital.com

// FARMACEUTICO - Dispensação
ana.farmaceutica@farmacia.com

// PACIENTE - Consulta próprios dados
joao.paciente@email.com
```

### **Endpoints de Autenticação**

#### **POST** `/api/auth/register`
```json
{
  "nome": "Dr. João Silva",
  "email": "joao@hospital.com", 
  "senha": "123456",
  "role": "MEDICO"
}
```

#### **POST** `/api/auth/login`
```json
{
  "email": "joao@hospital.com",
  "senha": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid-do-usuario",
      "nome": "Dr. João Silva",
      "email": "joao@hospital.com",
      "role": "MEDICO"
    }
  }
}
```

## 🌐 **API Endpoints**

### **🔐 Autenticação**
```
POST   /api/auth/register    # Registro de usuários
POST   /api/auth/login       # Login
```

### **💊 Medicamentos (Autenticado)**
```
GET    /api/medicamentos                    # Listar todos
GET    /api/medicamentos/:id               # Buscar por ID
GET    /api/medicamentos/nome/:nome        # Filtrar por nome
GET    /api/medicamentos/fornecedor/:id    # Filtrar por fornecedor
POST   /api/medicamentos                   # Criar (ADMIN/FARMACEUTICO)
PUT    /api/medicamentos/:id               # Atualizar (ADMIN/FARMACEUTICO)
DELETE /api/medicamentos/:id               # Deletar (ADMIN)
```

### **📦 Controle de Estoque (Autenticado)**
```
GET    /api/controle-estoque                      # Listar todos
GET    /api/controle-estoque/:id                  # Buscar por ID
GET    /api/controle-estoque/medico/:id           # Filtrar por médico
GET    /api/controle-estoque/paciente/:id         # Filtrar por paciente
GET    /api/controle-estoque/status/:status       # Filtrar por status
POST   /api/controle-estoque                      # Criar solicitação (MEDICO/ADMIN)
PUT    /api/controle-estoque/:id                  # Atualizar (FARMACEUTICO/ADMIN)
PUT    /api/controle-estoque/:id/status           # Atualizar status
DELETE /api/controle-estoque/:id                  # Deletar (ADMIN)
```

### **🏷️ Lotes (Autenticado)**
```
GET    /api/lotes                        # Listar todos
GET    /api/lotes/:id                    # Buscar por ID
GET    /api/lotes/produto/:id            # Filtrar por produto
GET    /api/lotes/vencidos               # Listar vencidos
GET    /api/lotes/proximo-vencimento     # Próximos do vencimento
POST   /api/lotes                        # Criar (FARMACEUTICO/ADMIN)
PUT    /api/lotes/:id                    # Atualizar (FARMACEUTICO/ADMIN)
DELETE /api/lotes/:id                    # Deletar (ADMIN)
```

### **🏢 Fornecedores (Autenticado)**
```
GET    /api/fornecedores                 # Listar todos
GET    /api/fornecedores/:id             # Buscar por ID
GET    /api/fornecedores/nome/:nome      # Filtrar por nome
GET    /api/fornecedores/status/:status  # Filtrar por status
POST   /api/fornecedores                 # Criar (ADMIN)
PUT    /api/fornecedores/:id             # Atualizar (ADMIN)
DELETE /api/fornecedores/:id             # Deletar (ADMIN)
```

### **👨‍⚕️ Médicos (Autenticado)**
```
GET    /api/medicos                      # Listar todos
GET    /api/medicos/:id                  # Buscar por ID
GET    /api/medicos/nome/:nome           # Filtrar por nome
POST   /api/medicos                      # Criar (ADMIN)
PUT    /api/medicos/:id                  # Atualizar (ADMIN)
DELETE /api/medicos/:id                  # Deletar (ADMIN)
```

### **🧑‍🤝‍🧑 Pacientes (Autenticado)**
```
GET    /api/pacientes                    # Listar todos
GET    /api/pacientes/:id                # Buscar por ID
GET    /api/pacientes/nome/:nome         # Filtrar por nome
POST   /api/pacientes                    # Criar (MEDICO/FARMACEUTICO/ADMIN)
PUT    /api/pacientes/:id                # Atualizar (MEDICO/FARMACEUTICO/ADMIN)
DELETE /api/pacientes/:id                # Deletar (ADMIN)
```

## 🔒 **Controle de Acesso por Role**

### **ADMIN** - Acesso total
- Todas as operações em todas as entidades
- Únicos que podem deletar registros
- Gerenciamento completo de usuários

### **MEDICO** - Prescrições e pacientes
- Criar solicitações de medicamentos
- Gerenciar pacientes
- Consultar medicamentos e lotes
- Visualizar próprias prescrições

### **FARMACEUTICO** - Dispensação
- Atualizar status de solicitações
- Gerenciar lotes de medicamentos
- Cadastrar medicamentos
- Gerenciar pacientes

### **PACIENTE** - Visualização limitada
- Consultar próprios dados
- Visualizar medicamentos disponíveis

## 🗃️ **Estrutura do Banco de Dados**

### **Entidades Principais**
- **usuarios** - Sistema de autenticação
- **medicamentos** - Catálogo de medicamentos
- **fornecedores** - Empresas fornecedoras
- **lotes** - Controle de validade
- **estoque** - Quantidade por local
- **controle_estoque** - Solicitações e dispensações
- **medicos** - Profissionais prescritores
- **pacientes** - Destinatários
- **farmaceuticos** - Profissionais dispensadores

### **Relacionamentos**
- Medicamento → Fornecedor
- Lote → Medicamento (produto)
- Estoque → Lote
- ControleEstoque → Medico, Paciente, Estoque

## 📈 **Funcionalidades Implementadas**

### **✅ Autenticação Segura**
- Criptografia bcrypt com salt
- Tokens JWT com expiração
- Middleware de verificação
- Sistema de roles hierárquico

### **✅ Controle de Estoque**
- Solicitações com status (Reservado, Concluído, Cancelado)
- Validações de dados obrigatórios
- Relatórios automáticos
- Alertas de vencimento

### **✅ Sistema de Filtros**
- Busca por múltiplos critérios
- Filtros específicos por entidade
- Performance otimizada

### **✅ Validações de Dados**
- Campos obrigatórios por entidade
- Validação de formato de email
- Verificação de duplicatas
- Tratamento de erros

## 🧪 **Testando a API**

### **1. Registrar usuário**
```bash
POST http://localhost:5000/api/auth/register
{
  "nome": "Teste User",
  "email": "teste@email.com",
  "senha": "123456",
  "role": "FARMACEUTICO"
}
```

### **2. Fazer login**
```bash
POST http://localhost:5000/api/auth/login
{
  "email": "teste@email.com",
  "senha": "123456"
}
```

### **3. Usar token nas requisições**
```bash
GET http://localhost:5000/api/medicamentos
Authorization: Bearer <seu-token-jwt>
```

## 📝 **Scripts Disponíveis**

```bash
npm run dev        # Inicia servidor em desenvolvimento
npm run build      # Compila TypeScript
npm run start      # Inicia servidor produção
npm run migrate    # Executa migrations
npm run seed       # Executa seeds
npm run rollback   # Desfaz última migration
```

## 🎯 **Características Técnicas**

### **✅ Clean Code Aplicado**
- Nomenclatura clara e consistente
- Separação de responsabilidades
- Documentação técnica adequada
- Estrutura modular

### **✅ TypeScript Completo**
- Tipagem forte em todo projeto
- Interfaces bem definidas
- Generics para reutilização
- Enums para valores controlados

### **✅ Arquitetura em Camadas**
- Controller → Service → Repository
- Middlewares de autenticação
- DTOs para transferência de dados
- Models para entidades

### **✅ Tratamento de Erros**
- Responses padronizadas
- Status codes apropriados
- Mensagens informativas
- Logs de erro

## 🚀 **Pronto para Apresentação**

O projeto está **100% completo** e funcional, com todas as funcionalidades implementadas conforme escopo da disciplina. Sistema robusto de autenticação, controle de estoque completo e API REST bem estruturada.

**Última atualização:** Dezembro 2024 - Projeto finalizado
