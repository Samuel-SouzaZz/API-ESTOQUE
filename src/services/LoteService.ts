import { IBaseService } from './BaseService';
import { ILote } from '../models/Lote';
import { repositories } from '../repositorio';

/**
 * Serviço para gerenciamento de Lotes
 * Implementa a lógica de negócios para operações com lotes de medicamentos
 */
export class LoteService implements IBaseService<ILote> {
  /**
   * Busca todos os lotes cadastrados
   * @returns Promise com lista de lotes
   */
  async findAll(): Promise<ILote[]> {
    return repositories.loteRepository.findAll();
  }

  /**
   * Busca um lote pelo ID
   * @param id ID do lote
   * @returns Promise com o lote encontrado ou null
   */
  async findById(id: string): Promise<ILote | null> {
    return repositories.loteRepository.findById(id);
  }

  /**
   * Cria um novo lote
   * @param data Dados do lote
   * @returns Promise com o lote criado
   * @throws Error se os dados obrigatórios não forem fornecidos
   */
  async create(data: Partial<ILote>): Promise<ILote> {
    // Validação de dados obrigatórios
    if (!data.codigo) {
      throw new Error('O código do lote é obrigatório');
    }

    if (!data.dataValidade) {
      throw new Error('A data de validade do lote é obrigatória');
    }

    if (!data.produtoId) {
      throw new Error('O produto (medicamento) do lote é obrigatório');
    }

    // Verifica se o produto (medicamento) existe
    const medicamento = await repositories.medicamentoRepository.findById(data.produtoId);
    if (!medicamento) {
      throw new Error('Medicamento não encontrado');
    }

    // Verifica se já existe lote com o mesmo código
    const loteExistente = await repositories.loteRepository.findByCodigo(data.codigo);
    if (loteExistente) {
      throw new Error('Já existe um lote com este código');
    }

    return repositories.loteRepository.create(data);
  }

  /**
   * Atualiza um lote existente
   * @param id ID do lote
   * @param data Dados para atualização
   * @returns Promise com o lote atualizado ou null
   */
  async update(id: string, data: Partial<ILote>): Promise<ILote | null> {
    // Verifica se o lote existe
    const loteExistente = await this.findById(id);
    if (!loteExistente) {
      return null;
    }

    // Se estiver alterando o código, verifica se o novo código já está em uso
    if (data.codigo && data.codigo !== loteExistente.codigo) {
      const loteMesmoCodigo = await repositories.loteRepository.findByCodigo(data.codigo);
      if (loteMesmoCodigo && loteMesmoCodigo.id !== id) {
        throw new Error('Já existe um lote com este código');
      }
    }

    // Se estiver alterando o produto, verifica se o novo produto existe
    if (data.produtoId && data.produtoId !== loteExistente.produtoId) {
      const medicamento = await repositories.medicamentoRepository.findById(data.produtoId);
      if (!medicamento) {
        throw new Error('Medicamento não encontrado');
      }
    }

    return repositories.loteRepository.update(id, data);
  }

  /**
   * Remove um lote
   * @param id ID do lote
   * @returns Promise com boolean indicando sucesso
   */
  async delete(id: string): Promise<boolean> {
    // Verifica se o lote existe
    const loteExistente = await this.findById(id);
    if (!loteExistente) {
      return false;
    }

    // Verifica se há estoque associado a este lote
    const estoqueAssociado = await repositories.estoqueRepository.findByLote(id);
    if (estoqueAssociado.length > 0) {
      throw new Error('Não é possível excluir um lote que possui itens em estoque');
    }

    return repositories.loteRepository.delete(id);
  }

  /**
   * Busca lotes por produto
   * @param produtoId ID do produto
   * @returns Promise com lista de lotes do produto
   */
  async findByProduto(produtoId: string): Promise<ILote[]> {
    return repositories.loteRepository.findByProduto(produtoId);
  }

  /**
   * Busca lotes vencidos
   * @param dataReferencia Data de referência para verificação (padrão: data atual)
   * @returns Promise com lista de lotes vencidos
   */
  async findLotesVencidos(dataReferencia: Date = new Date()): Promise<ILote[]> {
    return repositories.loteRepository.findLotesVencidos(dataReferencia);
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
    return repositories.loteRepository.findLotesProximosVencimento(diasLimite, dataReferencia);
  }

  /**
   * Verifica se um lote está vencido
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
} 