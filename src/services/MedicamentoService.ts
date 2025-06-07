import { IMedicamento } from '../models/Medicamento';
import { repositories } from '../repositorio';

/**
 * Serviço para gerenciamento de Medicamentos
 * Implementa a lógica de negócios
 */
export class MedicamentoService {
  /**
   * Busca todos os medicamentos
   */
  async findAll(): Promise<IMedicamento[]> {
    return repositories.medicamentoRepository.findAll();
  }

  /**
   * Busca um medicamento pelo ID
   */
  async findById(id: string): Promise<IMedicamento | null> {
    return repositories.medicamentoRepository.findById(id);
  }

  /**
   * Cria um novo medicamento
   */
  async create(data: Partial<IMedicamento>): Promise<IMedicamento> {
    // Validação obrigatória
    if (!data.nome) {
      throw new Error('Nome é obrigatório');
    }

    return repositories.medicamentoRepository.create(data);
  }

  /**
   * Atualiza um medicamento
   */
  async update(id: string, data: Partial<IMedicamento>): Promise<IMedicamento | null> {
    return repositories.medicamentoRepository.update(id, data);
  }

  /**
   * Remove um medicamento
   */
  async delete(id: string): Promise<boolean> {
    return repositories.medicamentoRepository.delete(id);
  }

  /**
   * Busca medicamentos por nome
   */
  async findByNome(nome: string): Promise<IMedicamento[]> {
    return repositories.medicamentoRepository.findByNome(nome);
  }

  /**
   * Busca medicamentos por fornecedor
   */
  async findByFornecedor(fornecedorId: string): Promise<IMedicamento[]> {
    return repositories.medicamentoRepository.findByFornecedor(fornecedorId);
  }
} 