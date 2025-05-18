/**
 * Arquivo para centralizar e facilitar a exportação dos serviços
 */
import { IBaseService } from './BaseService';
import { MedicamentoService } from './MedicamentoService';
import { ControleEstoqueService } from './ControleEstoqueService';
import { LoteService } from './LoteService';

// Exportação de todos os serviços
export {
  IBaseService,
  MedicamentoService,
  ControleEstoqueService,
  LoteService
};

/**
 * Função para criar instâncias dos serviços
 * Facilita a obtenção de instâncias únicas para uso nos controllers
 */
export const createServices = () => {
  return {
    medicamentoService: new MedicamentoService(),
    controleEstoqueService: new ControleEstoqueService(),
    loteService: new LoteService()
  };
};

// Serviços singleton para uso global
export const services = createServices(); 