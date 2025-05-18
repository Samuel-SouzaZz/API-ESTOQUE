import { v4 as uuidv4 } from 'uuid';
import { IBaseRepository } from './BaseRepository';
import Lote, { ILote } from '../models/Lote';

/**
 * Repositório para gerenciamento de Lotes de medicamentos
 * Implementa operações CRUD básicas e métodos específicos para lotes
 */
export class LoteRepository implements IBaseRepository<ILote> {
  // Simulando um banco de dados em memória para testes
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
   * Busca lotes por produto
   * @param produtoId ID do produto
   * @returns Promise com lista de lotes do produto
   */
  async findByProduto(produtoId: string): Promise<ILote[]> {
    return this.lotes.filter(l => l.produtoId === produtoId);
  }
  
  /**
   * Busca lotes por fornecedor
   * @param fornecedorId ID do fornecedor
   * @returns Promise com lista de lotes do fornecedor
   */
  async findByFornecedor(fornecedorId: string): Promise<ILote[]> {
    return this.lotes.filter(l => l.fornecedorId === fornecedorId);
  }
  
  /**
   * Busca lotes pelo código
   * @param codigo Código do lote
   * @returns Promise com o lote encontrado ou null
   */
  async findByCodigo(codigo: string): Promise<ILote | null> {
    const lote = this.lotes.find(l => l.codigo === codigo);
    return lote || null;
  }
  
  /**
   * Busca lotes vencidos
   * @param dataReferencia Data de referência para verificação (padrão: data atual)
   * @returns Promise com lista de lotes vencidos
   */
  async findLotesVencidos(dataReferencia: Date = new Date()): Promise<ILote[]> {
    return this.lotes.filter(l => l.dataValidade < dataReferencia);
  }
  
  /**
   * Busca lotes próximos do vencimento
   * @param diasLimite Quantidade de dias limite para o vencimento
   * @param dataReferencia Data de referência para verificação (padrão: data atual)
   * @returns Promise com lista de lotes próximos do vencimento
   */
  async findLotesProximosVencimento(
    diasLimite: number = 30,
    dataReferencia: Date = new Date()
  ): Promise<ILote[]> {
    const dataLimite = new Date(dataReferencia);
    dataLimite.setDate(dataLimite.getDate() + diasLimite);
    
    return this.lotes.filter(l => 
      l.dataValidade > dataReferencia && l.dataValidade <= dataLimite
    );
  }
  
  /**
   * Busca lotes com quantidade disponível
   * @param quantidadeMinima Quantidade mínima disponível
   * @returns Promise com lista de lotes com quantidade disponível
   */
  async findLotesDisponiveis(quantidadeMinima: number = 1): Promise<ILote[]> {
    return this.lotes.filter(l => l.quantidade >= quantidadeMinima);
  }
  
  /**
   * Verifica se um lote específico está vencido
   * @param id ID do lote
   * @param dataReferencia Data de referência para verificação (padrão: data atual)
   * @returns Promise com boolean indicando se o lote está vencido
   */
  async verificarVencimento(id: string, dataReferencia: Date = new Date()): Promise<boolean> {
    const lote = await this.findById(id);
    
    if (!lote) {
      throw new Error('Lote não encontrado');
    }
    
    return lote.dataValidade < dataReferencia;
  }
  
  /**
   * Atualiza a quantidade de um lote
   * @param id ID do lote
   * @param quantidade Nova quantidade ou quantidade a adicionar/subtrair
   * @param operacao Tipo de operação ('substituir', 'adicionar', 'subtrair')
   * @returns Promise com o lote atualizado ou null
   */
  async atualizarQuantidade(
    id: string, 
    quantidade: number, 
    operacao: 'substituir' | 'adicionar' | 'subtrair' = 'substituir'
  ): Promise<ILote | null> {
    const lote = await this.findById(id);
    
    if (!lote) {
      return null;
    }
    
    let novaQuantidade: number;
    
    switch (operacao) {
      case 'adicionar':
        novaQuantidade = lote.quantidade + quantidade;
        break;
      case 'subtrair':
        novaQuantidade = lote.quantidade - quantidade;
        if (novaQuantidade < 0) {
          throw new Error('Quantidade insuficiente no lote');
        }
        break;
      default: // substituir
        novaQuantidade = quantidade;
    }
    
    return this.update(id, { quantidade: novaQuantidade });
  }
} 