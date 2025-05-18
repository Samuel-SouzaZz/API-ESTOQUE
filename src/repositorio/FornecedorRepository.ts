import { v4 as uuidv4 } from 'uuid';
import { IBaseRepository } from './BaseRepository';
import Fornecedor, { IFornecedor } from '../models/Fornecedor';
import { StatusFornecedor } from '../models/enums/statusFornecedor';

/**
 * Repositório para gerenciamento de Fornecedores
 * Implementa operações CRUD básicas e métodos específicos para a entidade Fornecedor
 */
export class FornecedorRepository implements IBaseRepository<IFornecedor> {
  // Simulando um banco de dados em memória para testes
  private fornecedores: IFornecedor[] = [];

  /**
   * Busca todos os fornecedores cadastrados
   * @returns Promise com lista de fornecedores
   */
  async findAll(): Promise<IFornecedor[]> {
    return this.fornecedores;
  }

  /**
   * Busca um fornecedor pelo ID
   * @param id ID do fornecedor
   * @returns Promise com o fornecedor encontrado ou null
   */
  async findById(id: string): Promise<IFornecedor | null> {
    const fornecedor = this.fornecedores.find(f => f.id === id);
    return fornecedor || null;
  }

  /**
   * Cria um novo fornecedor
   * @param data Dados do fornecedor
   * @returns Promise com o fornecedor criado
   */
  async create(data: Partial<IFornecedor>): Promise<IFornecedor> {
    const novoFornecedor = new Fornecedor({
      ...data,
      id: uuidv4(),
      status: data.status || StatusFornecedor.Disponivel,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    this.fornecedores.push(novoFornecedor);
    return novoFornecedor;
  }

  /**
   * Atualiza um fornecedor existente
   * @param id ID do fornecedor
   * @param data Dados para atualização
   * @returns Promise com o fornecedor atualizado ou null
   */
  async update(id: string, data: Partial<IFornecedor>): Promise<IFornecedor | null> {
    const index = this.fornecedores.findIndex(f => f.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const fornecedorAtualizado = new Fornecedor({
      ...this.fornecedores[index],
      ...data,
      updatedAt: new Date()
    });
    
    this.fornecedores[index] = fornecedorAtualizado;
    return fornecedorAtualizado;
  }

  /**
   * Remove um fornecedor
   * @param id ID do fornecedor
   * @returns Promise com boolean indicando sucesso
   */
  async delete(id: string): Promise<boolean> {
    const index = this.fornecedores.findIndex(f => f.id === id);
    
    if (index === -1) {
      return false;
    }
    
    this.fornecedores.splice(index, 1);
    return true;
  }

  /**
   * Busca fornecedores por nome
   * @param nome Nome ou parte do nome do fornecedor
   * @returns Promise com lista de fornecedores que correspondem ao critério
   */
  async findByNome(nome: string): Promise<IFornecedor[]> {
    return this.fornecedores.filter(f => 
      f.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }

  /**
   * Busca fornecedores por status
   * @param status Status a ser filtrado
   * @returns Promise com lista de fornecedores com o status especificado
   */
  async findByStatus(status: string): Promise<IFornecedor[]> {
    return this.fornecedores.filter(f => f.status === status);
  }

  /**
   * Atualiza o status de um fornecedor
   * @param id ID do fornecedor
   * @param status Novo status
   * @returns Promise com o fornecedor atualizado ou null
   */
  async atualizarStatus(id: string, status: string): Promise<IFornecedor | null> {
    return this.update(id, { status });
  }
} 