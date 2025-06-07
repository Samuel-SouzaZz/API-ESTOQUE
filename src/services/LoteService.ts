import { ILote } from '../models/Lote';
import { repositories } from '../repositorio';

/**
 * Serviço para gerenciamento de Lotes
 * Implementa a lógica de negócios básica conforme conteúdo da disciplina
 */
export class LoteService {
  /**
   * Busca todos os lotes
   */
  async findAll(): Promise<ILote[]> {
    return repositories.loteRepository.findAll();
  }

  /**
   * Busca um lote pelo ID
   */
  async findById(id: string): Promise<ILote | null> {
    return repositories.loteRepository.findById(id);
  }

  /**
   * Cria um novo lote
   */
  async create(data: Partial<ILote>): Promise<ILote> {
    // Validação básica conforme matéria
    if (!data.produtoId) {
      throw new Error('Produto é obrigatório');
    }

    if (!data.dataValidade) {
      throw new Error('Data de validade é obrigatória');
    }

    return repositories.loteRepository.create(data);
  }

  /**
   * Atualiza um lote
   */
  async update(id: string, data: Partial<ILote>): Promise<ILote | null> {
    return repositories.loteRepository.update(id, data);
  }

  /**
   * Remove um lote
   */
  async delete(id: string): Promise<boolean> {
    return repositories.loteRepository.delete(id);
  }

  /**
   * Busca lotes por produto (filtro básico conforme matéria)
   */
  async findByProduto(produtoId: string): Promise<ILote[]> {
    return repositories.loteRepository.findByProduto(produtoId);
  }

  /**
   * Busca lotes vencidos (funcionalidade básica conforme matéria)
   */
  async findLotesVencidos(): Promise<ILote[]> {
    return repositories.loteRepository.findLotesVencidos();
  }

  /**
   * Busca lotes próximos do vencimento (funcionalidade básica conforme matéria)
   */
  async findLotesProximosVencimento(): Promise<ILote[]> {
    return repositories.loteRepository.findLotesProximosVencimento();
  }

  /**
   * Verifica se um lote está vencido (funcionalidade básica conforme matéria)
   */
  async verificarVencimento(id: string): Promise<boolean> {
    const lote = await this.findById(id);
    if (!lote) {
      throw new Error('Lote não encontrado');
    }

    const dataAtual = new Date();
    return lote.dataValidade < dataAtual;
  }
} 