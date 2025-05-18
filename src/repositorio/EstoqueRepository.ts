import { v4 as uuidv4 } from 'uuid';
import { IBaseRepository } from './BaseRepository';
import Estoque, { IEstoque } from '../models/Estoque';

/**
 * Repositório para gerenciamento de Estoque
 * Implementa operações CRUD básicas e métodos específicos para controle de estoque
 */
export class EstoqueRepository implements IBaseRepository<IEstoque> {
  // Simulando um banco de dados em memória para testes
  private estoques: IEstoque[] = [];

  /**
   * Busca todos os registros de estoque
   * @returns Promise com lista de registros de estoque
   */
  async findAll(): Promise<IEstoque[]> {
    return this.estoques;
  }

  /**
   * Busca um registro de estoque pelo ID
   * @param id ID do registro de estoque
   * @returns Promise com o registro encontrado ou null
   */
  async findById(id: string): Promise<IEstoque | null> {
    const estoque = this.estoques.find(est => est.id === id);
    return estoque || null;
  }

  /**
   * Cria um novo registro de estoque
   * @param data Dados do registro de estoque
   * @returns Promise com o registro criado
   */
  async create(data: Partial<IEstoque>): Promise<IEstoque> {
    const novoEstoque = new Estoque({
      ...data,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    this.estoques.push(novoEstoque);
    return novoEstoque;
  }

  /**
   * Atualiza um registro de estoque existente
   * @param id ID do registro de estoque
   * @param data Dados para atualização
   * @returns Promise com o registro atualizado ou null
   */
  async update(id: string, data: Partial<IEstoque>): Promise<IEstoque | null> {
    const index = this.estoques.findIndex(est => est.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const estoqueAtualizado = new Estoque({
      ...this.estoques[index],
      ...data,
      updatedAt: new Date()
    });
    
    this.estoques[index] = estoqueAtualizado;
    return estoqueAtualizado;
  }

  /**
   * Remove um registro de estoque
   * @param id ID do registro de estoque
   * @returns Promise com boolean indicando sucesso
   */
  async delete(id: string): Promise<boolean> {
    const index = this.estoques.findIndex(est => est.id === id);
    
    if (index === -1) {
      return false;
    }
    
    this.estoques.splice(index, 1);
    return true;
  }

  /**
   * Atualiza a quantidade em estoque
   * @param id ID do registro de estoque
   * @param quantidade Nova quantidade ou quantidade a adicionar/remover
   * @param isAdicao Se true, adiciona a quantidade; se false, subtrai
   * @param isSubstituicao Se true, substitui a quantidade atual; se false, ajusta
   * @returns Promise com o registro atualizado ou null
   */
  async atualizarQuantidade(
    id: string, 
    quantidade: number, 
    isAdicao: boolean = true, 
    isSubstituicao: boolean = false
  ): Promise<IEstoque | null> {
    const estoque = await this.findById(id);
    
    if (!estoque) {
      return null;
    }
    
    let novaQuantidade: number;
    
    if (isSubstituicao) {
      novaQuantidade = quantidade;
    } else {
      novaQuantidade = isAdicao ? 
        estoque.quantidade + quantidade : 
        estoque.quantidade - quantidade;
    }
    
    // Impede quantidade negativa
    if (novaQuantidade < 0) {
      novaQuantidade = 0;
    }
    
    return this.update(id, { quantidade: novaQuantidade });
  }

  /**
   * Busca registros de estoque por lote
   * @param loteId ID do lote
   * @returns Promise com lista de registros de estoque do lote
   */
  async findByLote(loteId: string): Promise<IEstoque[]> {
    return this.estoques.filter(est => est.loteId === loteId);
  }

  /**
   * Busca registros de estoque pelo local de armazenamento
   * @param local Nome ou parte do nome do local
   * @returns Promise com lista de registros de estoque do local
   */
  async findByLocal(local: string): Promise<IEstoque[]> {
    return this.estoques.filter(est => 
      est.local.toLowerCase().includes(local.toLowerCase())
    );
  }

  /**
   * Verifica se há quantidade disponível em estoque
   * @param id ID do registro de estoque
   * @param quantidadeNecessaria Quantidade necessária
   * @returns Promise com boolean indicando se há quantidade suficiente
   */
  async verificarDisponibilidade(id: string, quantidadeNecessaria: number): Promise<boolean> {
    const estoque = await this.findById(id);
    return estoque ? estoque.quantidade >= quantidadeNecessaria : false;
  }
} 