/**
 * Arquivo para centralizar e facilitar a exportação dos serviços
 * Centraliza exports dos services
 */
import { AuthService } from './AuthService';
import { MedicamentoService } from './MedicamentoService';
import { LoteService } from './LoteService';
import { ControleEstoqueService } from './ControleEstoqueService';
import { FornecedorService } from './FornecedorService';
import { PacienteService } from './PacienteService';

// Services do sistema
export const services = {
  authService: new AuthService(),
  medicamentoService: new MedicamentoService(),
  loteService: new LoteService(),
  controleEstoqueService: new ControleEstoqueService(),
  fornecedorService: new FornecedorService(),
  pacienteService: new PacienteService()
};

export {
  AuthService,
  MedicamentoService,
  LoteService,
  ControleEstoqueService,
  FornecedorService,
  PacienteService
}; 