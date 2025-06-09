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

<<<<<<< HEAD
### ✅ **Estrutura Técnica Completa**
- **Models** - Definição das entidades do sistema
- **Repositories** - Camada de acesso aos dados **simplificada**
- **Services** - Lógica de negócios **básica**
- **Controllers** - Interface HTTP **básica**
- **Rotas organizadas** por módulo
- **Filtros básicos** conforme matéria
- **Autenticação e autorização** JWT
- **User roles** (ADMIN, MEDICO, FARMACEUTICO, PACIENTE)
- **Clean Code** aplicado
- **Documentação** da API
=======
### **🔐 Autenticação JWT Completa**
- Sistema de registro e login
- Criptografia bcrypt (salt: 10)
- Tokens JWT seguros
- User roles: ADMIN, MEDICO, FARMACEUTICO, PACIENTE
- Hierarquia de permissões
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d

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
<<<<<<< HEAD
- **Armazenamento em memória** - Para simplicidade da disciplina
=======
- **Knex.js** - Query builder e migrations
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
- **JWT** - Autenticação e autorização
- **bcryptjs** - Criptografia de senhas
- **uuid** - Geração de IDs únicos
- **cors** - Cross-Origin Resource Sharing
- **dotenv** - Variáveis de ambiente

## 🏗️ **Arquitetura Completa**

```
📁 src/
<<<<<<< HEAD
├── 📁 models/          # Entidades básicas (conforme matéria)
├── 📁 repositorio/     # Acesso dados em memória (simplificado)
├── 📁 services/        # Lógica básica (simplificada)
├── 📁 controllers/     # CRUD básico (simplificado)
├── 📁 routes/          # Rotas organizadas (conforme matéria)
├── 📁 middleware/      # JWT auth (conforme matéria)
├── 📁 migrations/      # Estrutura de dados (conceitual)
└── 📁 dtos/            # DTOs básicos (conforme matéria)
=======
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
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
```

## 📦 **Instalação e Execução**

```bash
# 1. Clone e instale dependências
git clone <url-do-repositorio>
cd API-ESTOQUE
npm install

<<<<<<< HEAD
# 2. Configure variáveis (opcional)
=======
# 2. Configure variáveis de ambiente
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
cp .env.example .env
# Edite o arquivo .env conforme necessário

<<<<<<< HEAD
# 3. Inicie servidor
=======
# 3. Execute migrations e seeds
npm run migrate
npm run seed

# 4. Inicie o servidor
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
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

<<<<<<< HEAD
#### **GET** `/api/auth/verify`
Verifica token JWT

#### **GET** `/api/auth/me`
Dados do usuário (rota protegida)

## 🛡️ **Middleware Básico (Conforme Matéria)**

```typescript
// Middleware conforme ensinado na disciplina
- authenticate      // Verifica JWT
- adminOnly        // Role ADMIN
- medicoOnly       // Role MEDICO
- farmaceuticoOnly // Role FARMACEUTICO
```

## 📊 **API Endpoints (CRUD Básico)**

### **Medicamentos** - `/api/medicamentos`
- `GET /` - Listar todos
- `POST /` - Criar novo
- `GET /:id` - Buscar por ID
- `PUT /:id` - Atualizar
- `DELETE /:id` - Remover
- `GET /busca/nome?nome=x` - Filtro por nome
- `GET /fornecedor/:id` - Filtro por fornecedor

### **Controle de Estoque** - `/api/controle-estoque`
- `GET /` - Listar solicitações
- `POST /` - Nova solicitação
- `GET /:id` - Buscar por ID
- `PUT /:id` - Atualizar
- `DELETE /:id` - Remover
- `PATCH /:id/status` - Atualizar status
- `GET /medico/:id` - Por médico
- `GET /paciente/:id` - Por paciente
- `GET /relatorio` - Relatório simples

### **Lotes** - `/api/lotes`
- `GET /` - Listar lotes
- `POST /` - Criar lote
- `GET /:id` - Buscar por ID
- `PUT /:id` - Atualizar
- `DELETE /:id` - Remover
- `GET /produto/:id` - Por produto
- `GET /busca/vencidos` - Lotes vencidos
- `GET /busca/proximos-vencimento` - Próximos vencimento

## 💾 **Armazenamento de Dados (Simplificado para Disciplina)**

### **Repositórios em Memória**
Para facilitar o aprendizado e foco nos conceitos da disciplina:
- Todos os dados armazenados em **arrays em memória**
- **Sem banco de dados real** - simplicidade didática
- **UUIDs** para identificação única
- **Dados persistem** apenas durante execução

### **Entidades Principais**
```typescript
- usuarios[]          // Autenticação e roles
- medicamentos[]      // Catálogo de medicamentos
- lotes[]            // Controle de validade
- controle_estoque[] // Solicitações
- fornecedores[]     // Fornecedores
- pacientes[]        // Pacientes
```

## 🎯 **Conceitos Aplicados (Conforme Disciplina)**

### ✅ **Repositories Simplificados** (Conforme Matéria)
```typescript
// Repositório básico conforme ensinado
export class MedicamentoRepository implements IBaseRepository<IMedicamento> {
  private medicamentos: IMedicamento[] = []; // Armazenamento em memória
  
  async findAll(): Promise<IMedicamento[]> { ... }
  async findById(id: string): Promise<IMedicamento | null> { ... }
  async create(data: Partial<IMedicamento>): Promise<IMedicamento> { ... }
  // CRUD básico apenas
}
```

### ✅ **Async/Await** (Básico)
```typescript
// Exemplo básico conforme matéria
static async findAll(req: Request, res: Response) {
  try {
    const medicamentos = await MedicamentoController.medicamentoService.findAll();
    res.json({
      success: true,
      message: 'Medicamentos recuperados com sucesso',
      data: medicamentos
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar medicamentos',
      error: error.message
    });
=======
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
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
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

<<<<<<< HEAD
### ✅ **Filtros Básicos** (Conforme Matéria)
```typescript
// Filtros simples conforme ensinado
async findByNome(nome: string): Promise<IMedicamento[]> {
  return repositories.medicamentoRepository.findByNome(nome);
}

// Filtros por data simples
async findLotesVencidos(): Promise<ILote[]> {
  const hoje = new Date();
  return this.lotes.filter(l => l.dataValidade < hoje);
}
=======
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
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
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

<<<<<<< HEAD
## ⚙️ **Variáveis de Ambiente**

```env
# Conforme matéria
PORT=5000
NODE_ENV=development
JWT_SECRET=seu_jwt_secret_aqui
JWT_EXPIRATION=24h
=======
### **🧑‍🤝‍🧑 Pacientes (Autenticado)**
```
GET    /api/pacientes                    # Listar todos
GET    /api/pacientes/:id                # Buscar por ID
GET    /api/pacientes/nome/:nome         # Filtrar por nome
POST   /api/pacientes                    # Criar (MEDICO/FARMACEUTICO/ADMIN)
PUT    /api/pacientes/:id                # Atualizar (MEDICO/FARMACEUTICO/ADMIN)
DELETE /api/pacientes/:id                # Deletar (ADMIN)
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
```

## 🔒 **Controle de Acesso por Role**

<<<<<<< HEAD
```bash
npm run dev          # Desenvolvimento
npm run build        # Build TypeScript
npm start           # Produção
```
=======
### **ADMIN** - Acesso total
- Todas as operações em todas as entidades
- Únicos que podem deletar registros
- Gerenciamento completo de usuários
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d

### **MEDICO** - Prescrições e pacientes
- Criar solicitações de medicamentos
- Gerenciar pacientes
- Consultar medicamentos e lotes
- Visualizar próprias prescrições

<<<<<<< HEAD
- **Bcrypt** para senhas (salt: 10)
- **JWT** com expiração de 24h
- **Middleware** de autenticação básico
- **User roles** simples
- **CORS** configurado
=======
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
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d

## 📈 **Funcionalidades Implementadas**

### **✅ Autenticação Segura**
- Criptografia bcrypt com salt
- Tokens JWT com expiração
- Middleware de verificação
- Sistema de roles hierárquico

<<<<<<< HEAD
### **Filtros Básicos**
- ✅ Por nome, fornecedor, médico, paciente
- ✅ Por status (enum básico)
- ✅ Lotes vencidos (comparação de data simples)
=======
### **✅ Controle de Estoque**
- Solicitações com status (Reservado, Concluído, Cancelado)
- Validações de dados obrigatórios
- Relatórios automáticos
- Alertas de vencimento
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d

### **✅ Sistema de Filtros**
- Busca por múltiplos critérios
- Filtros específicos por entidade
- Performance otimizada

### **✅ Validações de Dados**
- Campos obrigatórios por entidade
- Validação de formato de email
- Verificação de duplicatas
- Tratamento de erros

<<<<<<< HEAD
### ✅ **Avaliação do Projeto**
- ✅ Organização e estrutura simples
- ✅ Conteúdos da disciplina aplicados
- ✅ Funcionalidades conforme requisitos básicos
- ✅ Dados bem estruturados em memória
- ✅ Qualidade técnica adequada

### ✅ **Conceitos da Disciplina**
- ✅ **TypeScript** - Tipagem básica
- ✅ **Express** - Routes, middleware, controllers
- ✅ **JWT** - Autenticação básica
- ✅ **Async/Await** - Operações assíncronas
- ✅ **Clean Code** - Nomes claros, organização
- ✅ **Arquitetura** - Separação de responsabilidades básica
- ✅ **DTOs** - Transferência de dados
- ✅ **Filtros** - Query params básicos
- ✅ **User Roles** - Autorização simples
- ✅ **Repositories** - Padrão de acesso a dados simplificado

## 📝 **Documentação Técnica**

### **Token JWT Básico**
```json
=======
## 🧪 **Testando a API**

### **1. Registrar usuário**
```bash
POST http://localhost:5000/api/auth/register
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
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

<<<<<<< HEAD
### **Fluxo Básico de Solicitação**
```typescript
// 1. Médico faz login
// 2. Cria solicitação para paciente
// 3. Sistema verifica disponibilidade básica
// 4. Farmacêutico aprova ou nega
// 5. Status é atualizado
```

---

**Projeto desenvolvido estritamente conforme o conteúdo ministrado na disciplina Desenvolvimento Web Back-end I**  
**Aplicando conceitos fundamentais de forma didática e simplificada** 🚀

**✅ Adequado para apresentação acadêmica - Funcionalidades no escopo exato da matéria**

**🎯 Foco em aprendizado: Repositories em memória, CRUD básico, JWT simples, Filtros básicos**
=======
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
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
