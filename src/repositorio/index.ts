/**
 * Arquivo para centralizar e facilitar a exportação dos repositórios
 */
import { IBaseRepository } from './BaseRepository';
import { MedicamentoRepository } from './MedicamentoRepository';
import { EstoqueRepository } from './EstoqueRepository';
import { ControleEstoqueRepository } from './ControleEstoqueRepository';
import { LoteRepository } from './LoteRepository';
import { MedicoRepository } from './MedicoRepository';
import { PacienteRepository } from './PacienteRepository';
import { FornecedorRepository } from './FornecedorRepository';

// Exportação de todos os repositórios
export {
  IBaseRepository,
  MedicamentoRepository,
  EstoqueRepository,
  ControleEstoqueRepository,
  LoteRepository,
  MedicoRepository,
  PacienteRepository,
  FornecedorRepository
};

/**
 * Função para criar instâncias dos repositórios
 * Facilita a obtenção de instâncias únicas para uso nos serviços e controllers
 */
export const createRepositories = () => {
  return {
    medicamentoRepository: new MedicamentoRepository(),
    estoqueRepository: new EstoqueRepository(),
    controleEstoqueRepository: new ControleEstoqueRepository(),
    loteRepository: new LoteRepository(),
    medicoRepository: new MedicoRepository(),
    pacienteRepository: new PacienteRepository(),
    fornecedorRepository: new FornecedorRepository()
  };
};

// Repositórios singleton para uso global
export const repositories = createRepositories(); 