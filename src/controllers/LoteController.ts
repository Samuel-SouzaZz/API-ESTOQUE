import { Request, Response } from 'express';
import { LoteService } from '../services/LoteService';

/**
 * Controller para lotes de medicamentos
 * Implementa operações de lotes
 */
export class LoteController {
  private static loteService = new LoteService();

  /**
   * Busca todos os lotes
   */
  static async findAll(req: Request, res: Response) {
    try {
      const lotes = await LoteController.loteService.findAll();
      res.json({
        success: true,
        message: 'Lotes encontrados',
        data: lotes
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar lotes',
        error: error.message
      });
    }
  }

  /**
   * Busca lote por ID
   */
  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const lote = await LoteController.loteService.findById(id);
      
      if (!lote) {
        return res.status(404).json({
          success: false,
          message: 'Lote não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Lote encontrado',
        data: lote
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar lote',
        error: error.message
      });
    }
  }

  /**
   * Cria novo lote
   */
  static async create(req: Request, res: Response) {
    try {
      const lote = await LoteController.loteService.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Lote criado',
        data: lote
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Erro ao criar lote',
        error: error.message
      });
    }
  }

  /**
   * Atualiza lote
   */
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const lote = await LoteController.loteService.update(id, req.body);
      
      if (!lote) {
        return res.status(404).json({
          success: false,
          message: 'Lote não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Lote atualizado',
        data: lote
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Erro ao atualizar lote',
        error: error.message
      });
    }
  }

  /**
   * Remove lote
   */
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await LoteController.loteService.delete(id);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Lote não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Lote removido'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao remover lote',
        error: error.message
      });
    }
  }

  /**
   * Busca por produto
   */
  static async findByProduto(req: Request, res: Response) {
    try {
      const { produtoId } = req.params;
      const lotes = await LoteController.loteService.findByProduto(produtoId);
      
      // Validação seguindo Clean Code - tratamento adequado de casos edge
      if (!lotes || lotes.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Nenhum lote encontrado para o produto '${produtoId}'`,
          data: []
        });
      }
      
      res.json({
        success: true,
        message: `${lotes.length} lote(s) encontrado(s) para o produto`,
        data: lotes
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro na busca por produto',
        error: error.message
      });
    }
  }

  /**
   * Busca lotes vencidos
   */
  static async findLotesVencidos(req: Request, res: Response) {
    try {
      const lotes = await LoteController.loteService.findLotesVencidos();
      res.json({
        success: true,
        message: 'Lotes vencidos encontrados',
        data: lotes
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar lotes vencidos',
        error: error.message
      });
    }
  }

  /**
   * Busca lotes próximos do vencimento
   */
  static async findLotesProximosVencimento(req: Request, res: Response) {
    try {
      const lotes = await LoteController.loteService.findLotesProximosVencimento();
      res.json({
        success: true,
        message: 'Lotes próximos do vencimento encontrados',
        data: lotes
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar lotes próximos do vencimento',
        error: error.message
      });
    }
  }

  /**
   * Verifica vencimento de um lote
   */
  static async verificarVencimento(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const vencido = await LoteController.loteService.verificarVencimento(id);
      
      res.json({
        success: true,
        message: 'Verificação de vencimento realizada',
        data: { vencido }
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao verificar vencimento',
        error: error.message
      });
    }
  }
} 