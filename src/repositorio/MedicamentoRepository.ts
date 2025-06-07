import { v4 as uuidv4 } from 'uuid';
import { IBaseRepository } from './BaseRepository';
import Medicamento, { IMedicamento } from '../models/Medicamento';

/**
 * Repositório para gerenciamento de Medicamentos
 */
export class MedicamentoRepository implements IBaseRepository<IMedicamento> {
  private medicamentos: IMedicamento[] = [];

  /**
   * Busca todos os medicamentos cadastrados
   * @returns Promise com lista de medicamentos
   */
  async findAll(): Promise<IMedicamento[]> {
    return this.medicamentos;
  }

  /**
   * Busca um medicamento pelo ID
   * @param id ID do medicamento
   * @returns Promise com o medicamento encontrado ou null
   */
  async findById(id: string): Promise<IMedicamento | null> {
    const medicamento = this.medicamentos.find(med => med.id === id);
    return medicamento || null;
  }

  /**
   * Cria um novo medicamento
   * @param data Dados do medicamento
   * @returns Promise com o medicamento criado
   */
  async create(data: Partial<IMedicamento>): Promise<IMedicamento> {
    const novoMedicamento = new Medicamento({
      ...data,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    this.medicamentos.push(novoMedicamento);
    return novoMedicamento;
  }

  /**
   * Atualiza um medicamento existente
   * @param id ID do medicamento
   * @param data Dados para atualização
   * @returns Promise com o medicamento atualizado ou null
   */
  async update(id: string, data: Partial<IMedicamento>): Promise<IMedicamento | null> {
    const index = this.medicamentos.findIndex(med => med.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const medicamentoAtualizado = new Medicamento({
      ...this.medicamentos[index],
      ...data,
      updatedAt: new Date()
    });
    
    this.medicamentos[index] = medicamentoAtualizado;
    return medicamentoAtualizado;
  }

  /**
   * Remove um medicamento
   * @param id ID do medicamento
   * @returns Promise com boolean indicando sucesso
   */
  async delete(id: string): Promise<boolean> {
    const index = this.medicamentos.findIndex(med => med.id === id);
    
    if (index === -1) {
      return false;
    }
    
    this.medicamentos.splice(index, 1);
    return true;
  }

  /**
   * Busca medicamentos por nome (método específico)
   * @param nome Nome ou parte do nome do medicamento
   * @returns Promise com lista de medicamentos que correspondem ao critério
   */
  async findByNome(nome: string): Promise<IMedicamento[]> {
    return this.medicamentos.filter(med => 
      med.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  /**
   * Busca medicamentos por fornecedor (método específico)
   * @param fornecedorId ID do fornecedor
   * @returns Promise com lista de medicamentos do fornecedor
   */
  async findByFornecedor(fornecedorId: string): Promise<IMedicamento[]> {
    return this.medicamentos.filter(med => med.fornecedorId === fornecedorId);
  }
} 