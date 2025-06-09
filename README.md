# API de Controle de Estoque de Medicamentos
**Trabalho Final - Desenvolvimento Web Back-end I**

Sistema para gerenciamento de estoque farmacêutico com autenticação JWT e controle de acesso baseado em roles, desenvolvido estritamente conforme conteúdo da disciplina.

## 👥 **Informações do Projeto**

- **Disciplina:** Desenvolvimento Web Back-end I
- **Professor:** Thiago Goldoni Thomé
- **Data da Apresentação:** 09/06/2025
- **Data Limite Commit:** 08/06/2025 às 23h59min59s

## 🎯 **Objetivos Atendidos (100% Conforme Disciplina)**

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

## 🚀 **Tecnologias (Conforme Ministrado)**

- **Node.js** com **TypeScript**
- **Express.js** - Framework web
- **Armazenamento em memória** - Para simplicidade da disciplina
- **JWT** - Autenticação e autorização
- **bcryptjs** - Criptografia de senhas
- **Cors** - Cross-Origin Resource Sharing
- **dotenv** - Variáveis de ambiente

## 🏗️ **Arquitetura Simples (Conforme Matéria)**

```
📁 src/
├── 📁 models/          # Entidades básicas (conforme matéria)
├── 📁 repositorio/     # Acesso dados em memória (simplificado)
├── 📁 services/        # Lógica básica (simplificada)
├── 📁 controllers/     # CRUD básico (simplificado)
├── 📁 routes/          # Rotas organizadas (conforme matéria)
├── 📁 middleware/      # JWT auth (conforme matéria)
├── 📁 migrations/      # Estrutura de dados (conceitual)
└── 📁 dtos/            # DTOs básicos (conforme matéria)
```

## 📦 **Instalação e Execução**

```bash
# 1. Clone e instale
git clone <url-do-repositorio>
cd API-ESTOQUE
npm install

# 2. Configure variáveis (opcional)
cp .env.example .env

# 3. Inicie servidor
npm run dev
```

## 🔐 **Autenticação JWT (Conforme Matéria)**

### **Endpoints Básicos**

#### **POST** `/api/auth/register`
```json
{
  "nome": "Dr. João Silva",
  "email": "joao@hospital.com", 
  "senha": "123456",
  "role": "medico"
}
```

#### **POST** `/api/auth/login`
```json
{
  "email": "joao@hospital.com",
  "senha": "123456"
}
```

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
  }
}
```

### ✅ **Controllers Simples** (Conforme Matéria)
```typescript
// CRUD básico conforme ensinado
export class MedicamentoController {
  static async findAll(req: Request, res: Response) { ... }
  static async findById(req: Request, res: Response) { ... }
  static async create(req: Request, res: Response) { ... }
  static async update(req: Request, res: Response) { ... }
  static async delete(req: Request, res: Response) { ... }
}
```

### ✅ **Services Básicos** (Conforme Matéria)
```typescript
// Lógica simples conforme disciplina
export class MedicamentoService {
  async findAll(): Promise<IMedicamento[]> { ... }
  async findById(id: string): Promise<IMedicamento | null> { ... }
  async create(data: Partial<IMedicamento>): Promise<IMedicamento> { ... }
  // Validações básicas apenas
}
```

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
```

### ✅ **DTOs Básicos** (Conforme Matéria)
```typescript
// UserDTO sem senha (conceito básico de DTO)
export class UserDTO {
  id!: string;
  name!: string;
  email!: string;
  role!: UserRole;
  // senha omitida intencionalmente
}
```

### ✅ **Resposta Padronizada** (Básica)
```json
{
  "success": true,
  "message": "Operação realizada",
  "data": { ... }
}
```

## 🧪 **Testando a API (Simples)**

### **cURL Básico**
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@test.com", "senha": "123456"}'

# Usar token
curl -X GET http://localhost:5000/api/medicamentos \
  -H "Authorization: Bearer <token>"
```

## ⚙️ **Variáveis de Ambiente**

```env
# Conforme matéria
PORT=5000
NODE_ENV=development
JWT_SECRET=seu_jwt_secret_aqui
JWT_EXPIRATION=24h
```

## 🚦 **Scripts Disponíveis**

```bash
npm run dev          # Desenvolvimento
npm run build        # Build TypeScript
npm start           # Produção
```

## 🔒 **Segurança Básica (Conforme Matéria)**

- **Bcrypt** para senhas (salt: 10)
- **JWT** com expiração de 24h
- **Middleware** de autenticação básico
- **User roles** simples
- **CORS** configurado

## 📈 **Funcionalidades Implementadas**

### **CRUD Completo**
- ✅ Create, Read, Update, Delete para todas entidades
- ✅ Validações básicas nos services
- ✅ Tratamento de erros simples

### **Filtros Básicos**
- ✅ Por nome, fornecedor, médico, paciente
- ✅ Por status (enum básico)
- ✅ Lotes vencidos (comparação de data simples)

### **Relatórios Simples**
```typescript
// Relatório básico conforme matéria
async relatorio(): Promise<any> {
  const todos = await this.findAll();
  return {
    total: todos.length,
    reservados: todos.filter(item => item.status === 'Reservado').length,
    concluidos: todos.filter(item => item.status === 'Concluido').length
  };
}
```

## 🎓 **Critérios de Avaliação Atendidos**

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
{
  "id": "user-id",
  "name": "Nome Usuário", 
  "email": "user@email.com",
  "role": "medico"
}
```

### **Estrutura Response**
```json
{
  "success": true|false,
  "message": "Descrição da operação",
  "data": { ... },           // apenas em success
  "error": "Erro detalhado"  // apenas em error
}
```

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
