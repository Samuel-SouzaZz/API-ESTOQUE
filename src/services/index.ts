/**
 * Arquivo para centralizar e facilitar a exportação dos serviços
 * Versão simplificada conforme conteúdo da disciplina
 */
import { AuthService } from './AuthService';
import { MedicamentoService } from './MedicamentoService';
import { LoteService } from './LoteService';
import { ControleEstoqueService } from './ControleEstoqueService';

// Services simples conforme conteúdo da disciplina
export const services = {
  authService: new AuthService(),
  medicamentoService: new MedicamentoService(),
  loteService: new LoteService(),
  controleEstoqueService: new ControleEstoqueService()
};

export {
  AuthService,
  MedicamentoService,
  LoteService,
  ControleEstoqueService
}; 