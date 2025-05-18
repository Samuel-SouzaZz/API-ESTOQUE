import { IBaseService } from './BaseService';
import { IMedicamento } from '../models/Medicamento';
import { repositories } from '../repositorio';

/**
 * Serviço para gerenciamento de Medicamentos
 * Implementa a lógica de negócios para operações com medicamentos
 */
export class MedicamentoService implements IBaseService<IMedicamento> {
  /**
   * Busca todos os medicamentos cadastrados
   * @returns Promise com lista de medicamentos
   */
  async findAll(): Promise<IMedicamento[]> {
    return repositories.medicamentoRepository.findAll();
  }

  /**
   * Busca um medicamento pelo ID
   * @param id ID do medicamento
   * @returns Promise com o medicamento encontrado ou null
   */
  async findById(id: string): Promise<IMedicamento | null> {
    return repositories.medicamentoRepository.findById(id);
  }

  /**
   * Cria um novo medicamento
   * @param data Dados do medicamento
   * @returns Promise com o medicamento criado
   * @throws Error se os dados obrigatórios não forem fornecidos
   */
  async create(data: Partial<IMedicamento>): Promise<IMedicamento> {
    // Validação de dados obrigatórios
    if (!data.nome) {
      throw new Error('O nome do medicamento é obrigatório');
    }

    if (!data.fornecedorId) {
      throw new Error('O fornecedor do medicamento é obrigatório');
    }

    return repositories.medicamentoRepository.create(data);
  }

  /**
   * Atualiza um medicamento existente
   * @param id ID do medicamento
   * @param data Dados para atualização
   * @returns Promise com o medicamento atualizado ou null
   */
  async update(id: string, data: Partial<IMedicamento>): Promise<IMedicamento | null> {
    // Verifica se o medicamento existe
    const medicamentoExistente = await this.findById(id);
    if (!medicamentoExistente) {
      return null;
    }

    return repositories.medicamentoRepository.update(id, data);
  }

  /**
   * Remove um medicamento
   * @param id ID do medicamento
   * @returns Promise com boolean indicando sucesso
   */
  async delete(id: string): Promise<boolean> {
    // Verifica se o medicamento existe
    const medicamentoExistente = await this.findById(id);
    if (!medicamentoExistente) {
      return false;
    }

    return repositories.medicamentoRepository.delete(id);
  }

  /**
   * Busca medicamentos por nome
   * @param nome Nome ou parte do nome do medicamento
   * @returns Promise com lista de medicamentos que correspondem ao critério
   */
  async findByNome(nome: string): Promise<IMedicamento[]> {
    return repositories.medicamentoRepository.findByNome(nome);
  }

  /**
   * Busca medicamentos por fornecedor
   * @param fornecedorId ID do fornecedor
   * @returns Promise com lista de medicamentos do fornecedor
   */
  async findByFornecedor(fornecedorId: string): Promise<IMedicamento[]> {
    return repositories.medicamentoRepository.findByFornecedor(fornecedorId);
  }
} 