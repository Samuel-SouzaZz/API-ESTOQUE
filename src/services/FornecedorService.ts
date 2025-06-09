import { IFornecedor } from '../models/Fornecedor';
import { repositories } from '../repositorio';

/**
 * Serviço para gerenciamento de Fornecedores
 * Implementa a lógica de negócios
 */
export class FornecedorService {
  /**
   * Busca todos os fornecedores
   */
  async findAll(): Promise<IFornecedor[]> {
    return repositories.fornecedorRepository.findAll();
  }

  /**
   * Busca um fornecedor pelo ID
   */
  async findById(id: string): Promise<IFornecedor | null> {
    return repositories.fornecedorRepository.findById(id);
  }

  /**
   * Cria um novo fornecedor
   */
  async create(data: Partial<IFornecedor>): Promise<IFornecedor> {
    // Validação obrigatória
    if (!data.nome) {
      throw new Error('Nome é obrigatório');
    }

    if (!data.telefone) {
      throw new Error('Telefone é obrigatório');
    }

    return repositories.fornecedorRepository.create(data);
  }

  /**
   * Atualiza um fornecedor
   */
  async update(id: string, data: Partial<IFornecedor>): Promise<IFornecedor | null> {
    return repositories.fornecedorRepository.update(id, data);
  }

  /**
   * Remove um fornecedor
   */
  async delete(id: string): Promise<boolean> {
    return repositories.fornecedorRepository.delete(id);
  }

  /**
   * Busca fornecedores por nome
   */
  async findByNome(nome: string): Promise<IFornecedor[]> {
    return repositories.fornecedorRepository.findByNome(nome);
  }

  /**
   * Busca fornecedores por status
   */
  async findByStatus(status: string): Promise<IFornecedor[]> {
    return repositories.fornecedorRepository.findByStatus(status);
  }
} 