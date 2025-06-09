/**
 * Arquivo para centralizar e facilitar a exportação dos repositórios
 * Conforme conteúdo da disciplina Desenvolvimento Web Back-end I
 */
import { IBaseRepository } from './BaseRepository';
import { MedicamentoRepository } from './MedicamentoRepository';
import { ControleEstoqueRepository } from './ControleEstoqueRepository';
import { LoteRepository } from './LoteRepository';
import { UsuarioRepository } from './UsuarioRepository';
import { MedicoRepository } from './MedicoRepository';
import { PacienteRepository } from './PacienteRepository';
import { FornecedorRepository } from './FornecedorRepository';

// Exportação de todos os repositórios
export {
  IBaseRepository,
  MedicamentoRepository,
  ControleEstoqueRepository,
  LoteRepository,
  UsuarioRepository,
  MedicoRepository,
  PacienteRepository,
  FornecedorRepository
};

/**
 * Função para criar instâncias dos repositórios (padrão básico)
 * Facilita a obtenção de instâncias únicas para uso nos serviços e controllers
 */
export const createRepositories = () => {
  return {
    medicamentoRepository: new MedicamentoRepository(),
    controleEstoqueRepository: new ControleEstoqueRepository(),
    loteRepository: new LoteRepository(),
    usuarioRepository: new UsuarioRepository(),
    medicoRepository: new MedicoRepository(),
    pacienteRepository: new PacienteRepository(),
    fornecedorRepository: new FornecedorRepository()
  };
};

// Repositórios singleton para uso global (padrão simples)
export const repositories = createRepositories(); 