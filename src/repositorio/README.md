# Repositórios de Dados

Este diretório contém as implementações dos repositórios para a API de Controle de Estoque de Medicamentos, conforme conteúdo da disciplina **Desenvolvimento Web Back-end I**.

## 📁 **Estrutura Básica**

- **BaseRepository.ts** - Interface genérica para operações CRUD
- **MedicamentoRepository.ts** - Repositório para medicamentos
- **LoteRepository.ts** - Repositório para lotes
- **ControleEstoqueRepository.ts** - Repositório para controle de estoque
- **UsuarioRepository.ts** - Repositório para usuários (autenticação)
- **PacienteRepository.ts** - Repositório para pacientes
- **FornecedorRepository.ts** - Repositório para fornecedores
- **index.ts** - Exportação centralizada

## 🎯 **Conceitos Aplicados (Conforme Matéria)**

### **CRUD Básico**
Todos os repositórios implementam as operações básicas:
- `findAll()` - Buscar todos
- `findById(id)` - Buscar por ID
- `create(data)` - Criar novo
- `update(id, data)` - Atualizar
- `delete(id)` - Remover

### **Filtros Simples**
Métodos básicos de filtro conforme ensinado:
- `findByNome()` - Filtro por nome
- `findByStatus()` - Filtro por status
- `findByEmail()` - Filtro por email (usuários)

### **Armazenamento em Memória**
Para simplicidade da disciplina, todos utilizam arrays em memória:
```typescript
private medicamentos: IMedicamento[] = [];
```

## 💻 **Uso Básico**

### **Importação Simples**
```typescript
import { repositories } from '../repositorio';

// Usar repositórios
const medicamentos = await repositories.medicamentoRepository.findAll();
```

### **CRUD Básico**
```typescript
// Criar
const novoMedicamento = await repositories.medicamentoRepository.create({
  nome: 'Aspirina',
  fornecedorId: 'fornecedor-id'
});

// Buscar
const medicamento = await repositories.medicamentoRepository.findById('id');

// Atualizar
await repositories.medicamentoRepository.update('id', { nome: 'Novo Nome' });

// Remover
await repositories.medicamentoRepository.delete('id');
```

## 🔧 **Funcionalidades Específicas**

### **MedicamentoRepository**
- `findByNome(nome)` - Busca por nome
- `findByFornecedor(fornecedorId)` - Busca por fornecedor

### **LoteRepository**
- `findByProduto(produtoId)` - Busca por produto
- `findLotesVencidos()` - Lotes vencidos
- `findLotesProximosVencimento()` - Próximos do vencimento

### **ControleEstoqueRepository**
- `findByMedico(medicoId)` - Busca por médico
- `findByPaciente(pacienteId)` - Busca por paciente
- `findByStatus(status)` - Busca por status
- `atualizarStatus(id, status)` - Atualiza status

### **UsuarioRepository**
- `findByEmail(email)` - Busca por email (para login)

---

**Implementação simples e didática conforme conteúdo de Desenvolvimento Web Back-end I** 📚 