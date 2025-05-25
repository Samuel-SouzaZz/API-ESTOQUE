# API de Controle de Estoque de Medicamentos

Sistema completo para gerenciamento de estoque farmacêutico com autenticação JWT e controle de acesso baseado em roles.

## 🚀 Tecnologias Utilizadas

- **Node.js** com **TypeScript**
- **Express.js** - Framework web
- **SQLite** (desenvolvimento) / **PostgreSQL** (produção)
- **Knex.js** - Query builder e migrations
- **JWT** - Autenticação e autorização
- **bcryptjs** - Criptografia de senhas
- **Cors** - Cross-Origin Resource Sharing
- **dotenv** - Gerenciamento de variáveis de ambiente

## 📦 Instalação

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
# Edite o arquivo .env com suas configurações
```

4. Execute as migrations:
```bash
npm run migrate
```

5. Inicie o servidor:
```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```
6.Comando	Tipo de biblioteca	Função principal:

```npm install class-validator class-transformer reflect-metadata```

## 🔐 Sistema de Autenticação

### Tipos de Usuário (Roles)

- **ADMIN** - Acesso total ao sistema
- **MEDICO** - Pode prescrever medicamentos e acessar dados de pacientes
- **FARMACEUTICO** - Pode dispensar medicamentos e controlar estoque
- **PACIENTE** - Acesso limitado aos próprios dados

### Endpoints de Autenticação

#### POST `/api/auth/register`
Registra um novo usuário no sistema.

**Body:**
```json
{
  "nome": "Dr. João Silva",
  "email": "joao@hospital.com",
  "senha": "123456",
  "role": "medico"
}
```

**Response:**
```json
{
  "message": "Usuário registrado com sucesso",
  "usuario": {
    "id": 1,
    "nome": "Dr. João Silva",
    "email": "joao@hospital.com",
    "role": "medico",
    "createdAt": "2024-01-20T10:30:00Z"
  }
}
```

#### POST `/api/auth/login`
Realiza login e retorna token JWT.

**Body:**
```json
{
  "email": "joao@hospital.com",
  "senha": "123456"
}
```

**Response:**
```json
{
  "message": "Login realizado com sucesso",
  "usuario": {
    "id": 1,
    "nome": "Dr. João Silva",
    "email": "joao@hospital.com",
    "role": "medico"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### GET `/api/auth/verify`
Verifica se o token JWT é válido.

**Headers:**
```
Authorization: Bearer <token>
```

#### GET `/api/auth/me`
Retorna dados do usuário logado.

**Headers:**
```
Authorization: Bearer <token>
```

## 🛡️ Rotas Protegidas

### Middleware de Autorização

- `authenticate` - Verifica se o usuário está autenticado
- `adminOnly` - Apenas usuários ADMIN
- `medicoOnly` - MEDICO ou ADMIN
- `farmaceuticoOnly` - FARMACEUTICO ou ADMIN
- `profissionaisOnly` - MEDICO, FARMACEUTICO ou ADMIN

### Exemplos de Rotas Protegidas

#### GET `/api/protected/admin`
**Acesso:** Apenas ADMIN
```json
{
  "message": "Área administrativa",
  "usuario": { "id": 1, "name": "Admin", "role": "admin" },
  "permissoes": [
    "Gerenciar todos os usuários",
    "Acessar relatórios completos",
    "Configurar sistema",
    "Backup e restore"
  ]
}
```

#### GET `/api/protected/medico`
**Acesso:** MEDICO ou ADMIN
```json
{
  "message": "Área médica",
  "usuario": { "id": 1, "name": "Dr. João", "role": "medico" },
  "permissoes": [
    "Prescrever medicamentos",
    "Acessar histórico de pacientes",
    "Gerar relatórios médicos",
    "Consultar estoque de medicamentos"
  ]
}
```

#### GET `/api/protected/farmaceutico`
**Acesso:** FARMACEUTICO ou ADMIN
```json
{
  "message": "Área farmacêutica",
  "usuario": { "id": 2, "name": "Ana Santos", "role": "farmaceutico" },
  "permissoes": [
    "Dispensar medicamentos",
    "Controlar estoque",
    "Registrar lotes",
    "Verificar validade"
  ]
}
```

## 📊 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verificar token
- `GET /api/auth/me` - Dados do usuário

### Medicamentos
- `GET /api/medicamentos` - Listar medicamentos
- `POST /api/medicamentos` - Criar medicamento
- `GET /api/medicamentos/:id` - Buscar medicamento
- `PUT /api/medicamentos/:id` - Atualizar medicamento
- `DELETE /api/medicamentos/:id` - Deletar medicamento

### Controle de Estoque
- `GET /api/controle-estoque` - Listar movimentações
- `POST /api/controle-estoque` - Registrar movimentação
- `GET /api/controle-estoque/:id` - Buscar movimentação

### Lotes
- `GET /api/lotes` - Listar lotes
- `POST /api/lotes` - Criar lote
- `GET /api/lotes/:id` - Buscar lote
- `PUT /api/lotes/:id` - Atualizar lote

### Fornecedores
- `GET /api/fornecedores` - Listar fornecedores
- `POST /api/fornecedores` - Criar fornecedor
- `GET /api/fornecedores/:id` - Buscar fornecedor
- `PUT /api/fornecedores/:id` - Atualizar fornecedor

### Pacientes
- `GET /api/pacientes` - Listar pacientes
- `POST /api/pacientes` - Criar paciente
- `GET /api/pacientes/:id` - Buscar paciente
- `PUT /api/pacientes/:id` - Atualizar paciente

## 🧪 Testando a API

### Script de Teste Automatizado

Execute o script de teste para verificar toda a funcionalidade de autenticação:

```powershell
# Windows PowerShell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\test-auth.ps1
```

### Testes Manuais com cURL

#### 1. Registrar usuário:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Dr. João Silva",
    "email": "joao@hospital.com",
    "senha": "123456",
    "role": "medico"
  }'
```

#### 2. Fazer login:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@hospital.com",
    "senha": "123456"
  }'
```

#### 3. Acessar rota protegida:
```bash
curl -X GET http://localhost:5000/api/protected/medico \
  -H "Authorization: Bearer <seu-token-aqui>"
```

## 🗄️ Estrutura do Banco de Dados

### Tabela `usuarios`
```sql
CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha VARCHAR(255) NOT NULL,
  role VARCHAR(255) DEFAULT 'paciente',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Outras Tabelas
- `medicamentos` - Informações dos medicamentos
- `lotes` - Controle de lotes e validade
- `estoque` - Quantidade em estoque
- `controle_estoque` - Movimentações de entrada/saída
- `fornecedores` - Dados dos fornecedores
- `pacientes` - Informações dos pacientes
- `medicos` - Dados dos médicos
- `farmaceuticos` - Dados dos farmacêuticos
- `farmacia_popular` - Programa farmácia popular

## 🚦 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor com hot reload

# Produção
npm run build        # Compila TypeScript
npm start           # Inicia servidor compilado

# Banco de Dados
npm run migrate     # Executa migrations
npm run migrate:rollback  # Desfaz última migration
npm run seed        # Executa seeds

# Testes
npm test           # Executa testes unitários
```

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Aplicação
PORT=5000
NODE_ENV=development

# Banco de Dados - Desenvolvimento
DB_HOST=localhost
DB_PORT=5432
DB_NAME=estoque_medicamentos_dev
DB_USER=postgres
DB_PASS=senha

# Banco de Dados - Teste
TEST_DB_HOST=localhost
TEST_DB_PORT=5432
TEST_DB_NAME=estoque_medicamentos_test
TEST_DB_USER=postgres
TEST_DB_PASS=senha

# Banco de Dados - Produção
DATABASE_URL=postgresql://user:pass@host:port/database

# Autenticação JWT
JWT_SECRET=seu_jwt_secret_muito_seguro_aqui
JWT_EXPIRATION=24h
```

## 🔒 Segurança

- **Senhas criptografadas** com bcryptjs (salt rounds: 10)
- **Tokens JWT** com expiração configurável
- **Middleware de autenticação** em todas as rotas protegidas
- **Controle de acesso baseado em roles**
- **Validação de entrada** em todos os endpoints
- **Headers de segurança** configurados

## 📚 Documentação Adicional

### Middleware de Autenticação

```typescript
// Uso em rotas
app.get('/rota-protegida', 
  authMiddleware.authenticate,
  authMiddleware.medicoOnly,
  controller.metodo
);
```

### Estrutura do Token JWT

```json
{
  "id": 1,
  "name": "Dr. João Silva",
  "email": "joao@hospital.com",
  "role": "medico",
  "iat": 1640995200,
  "exp": 1641081600
}
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para dúvidas ou suporte, entre em contato:
- **Email:** suporte@exemplo.com
- **GitHub Issues:** [Criar issue](../../issues)

---

**Desenvolvido com ❤️ para o controle eficiente de medicamentos**
