/**
 * Arquivo para centralizar e facilitar a exportação dos controllers
 */
import { MedicamentoController } from './MedicamentoController';
import { ControleEstoqueController } from './ControleEstoqueController';
import { LoteController } from './LoteController';
import { FornecedorController } from './FornecedorController';
import { PacienteController } from './PacienteController';
import { ApiResponse, successResponse, errorResponse } from './types';

// Exportação de todos os controllers e tipos
export {
  MedicamentoController,
  ControleEstoqueController,
  LoteController,
  FornecedorController,
  PacienteController,
  ApiResponse,
  successResponse,
  errorResponse
}; 