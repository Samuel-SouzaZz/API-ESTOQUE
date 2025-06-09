import { v4 as uuidv4 } from 'uuid';
import { IBaseRepository } from './BaseRepository';
import Lote, { ILote } from '../models/Lote';

/**
 * Repositório para gerenciamento de Lotes de medicamentos
<<<<<<< HEAD
 * Implementa operações CRUD básicas conforme conteúdo da disciplina
=======
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
 */
export class LoteRepository implements IBaseRepository<ILote> {
  private lotes: ILote[] = [];

  /**
   * Busca todos os lotes cadastrados
   * @returns Promise com lista de lotes
   */
  async findAll(): Promise<ILote[]> {
    return this.lotes;
  }

  /**
   * Busca um lote pelo ID
   * @param id ID do lote
   * @returns Promise com o lote encontrado ou null
   */
  async findById(id: string): Promise<ILote | null> {
    const lote = this.lotes.find(l => l.id === id);
    return lote || null;
  }

  /**
   * Cria um novo lote
   * @param data Dados do lote
   * @returns Promise com o lote criado
   */
  async create(data: Partial<ILote>): Promise<ILote> {
    const novoLote = new Lote({
      ...data,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    this.lotes.push(novoLote);
    return novoLote;
  }

  /**
   * Atualiza um lote existente
   * @param id ID do lote
   * @param data Dados para atualização
   * @returns Promise com o lote atualizado ou null
   */
  async update(id: string, data: Partial<ILote>): Promise<ILote | null> {
    const index = this.lotes.findIndex(l => l.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const loteAtualizado = new Lote({
      ...this.lotes[index],
      ...data,
      updatedAt: new Date()
    });
    
    this.lotes[index] = loteAtualizado;
    return loteAtualizado;
  }

  /**
   * Remove um lote
   * @param id ID do lote
   * @returns Promise com boolean indicando sucesso
   */
  async delete(id: string): Promise<boolean> {
    const index = this.lotes.findIndex(l => l.id === id);
    
    if (index === -1) {
      return false;
    }
    
    this.lotes.splice(index, 1);
    return true;
  }

  /**
   * Busca lotes por produto (filtro básico conforme matéria)
   * @param produtoId ID do produto
   * @returns Promise com lista de lotes do produto
   */
  async findByProduto(produtoId: string): Promise<ILote[]> {
    return this.lotes.filter(l => l.produtoId === produtoId);
  }
  
  /**
<<<<<<< HEAD
   * Busca lotes vencidos (filtro básico conforme matéria)
=======
   * Busca lotes vencidos
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
   * @returns Promise com lista de lotes vencidos
   */
  async findLotesVencidos(): Promise<ILote[]> {
    const hoje = new Date();
    return this.lotes.filter(l => l.dataValidade < hoje);
  }
  
  /**
<<<<<<< HEAD
   * Busca lotes próximos do vencimento (filtro básico conforme matéria)
=======
   * Busca lotes próximos do vencimento
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
   * @returns Promise com lista de lotes próximos do vencimento
   */
  async findLotesProximosVencimento(): Promise<ILote[]> {
    const hoje = new Date();
    const em30Dias = new Date();
    em30Dias.setDate(hoje.getDate() + 30);
    
    return this.lotes.filter(l => 
      l.dataValidade > hoje && l.dataValidade <= em30Dias
    );
  }
} 