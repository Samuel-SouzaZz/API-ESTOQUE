import { Request, Response } from 'express';
import { ControllerFunction, successResponse, errorResponse } from './types';
import { services } from '../services';

/**
 * Classe controladora para operações com lotes de medicamentos
 */
export class LoteController {
  /**
   * Busca todos os lotes
   * @param req Requisição Express
   * @param res Resposta Express
   */
  static findAll: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const lotes = await services.loteService.findAll();
      res.json(successResponse('Lotes recuperados com sucesso', lotes));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar lotes', error.message));
    }
  };

  /**
   * Busca um lote por ID
   * @param req Requisição Express contendo o ID do lote
   * @param res Resposta Express
   */
  static findById: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const lote = await services.loteService.findById(id);
      
      if (!lote) {
        return res.status(404).json(errorResponse('Lote não encontrado'));
      }
      
      res.json(successResponse('Lote recuperado com sucesso', lote));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar lote', error.message));
    }
  };

  /**
   * Cria um novo lote
   * @param req Requisição Express contendo os dados do lote
   * @param res Resposta Express
   */
  static create: ControllerFunction = async (req: Request, res: Response) => {
    try {
      // Tenta converter a data de validade para objeto Date
      if (req.body.dataValidade && typeof req.body.dataValidade === 'string') {
        req.body.dataValidade = new Date(req.body.dataValidade);
        
        if (isNaN(req.body.dataValidade.getTime())) {
          return res.status(400).json(errorResponse('Data de validade inválida'));
        }
      }
      
      const lote = await services.loteService.create(req.body);
      res.status(201).json(successResponse('Lote criado com sucesso', lote));
    } catch (error: any) {
      res.status(400).json(errorResponse('Erro ao criar lote', error.message));
    }
  };

  /**
   * Atualiza um lote existente
   * @param req Requisição Express contendo o ID e dados atualizados do lote
   * @param res Resposta Express
   */
  static update: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      
      // Tenta converter a data de validade para objeto Date
      if (req.body.dataValidade && typeof req.body.dataValidade === 'string') {
        req.body.dataValidade = new Date(req.body.dataValidade);
        
        if (isNaN(req.body.dataValidade.getTime())) {
          return res.status(400).json(errorResponse('Data de validade inválida'));
        }
      }
      
      const lote = await services.loteService.update(id, req.body);
      
      if (!lote) {
        return res.status(404).json(errorResponse('Lote não encontrado'));
      }
      
      res.json(successResponse('Lote atualizado com sucesso', lote));
    } catch (error: any) {
      res.status(400).json(errorResponse('Erro ao atualizar lote', error.message));
    }
  };

  /**
   * Remove um lote
   * @param req Requisição Express contendo o ID do lote
   * @param res Resposta Express
   */
  static delete: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await services.loteService.delete(id);
      
      if (!result) {
        return res.status(404).json(errorResponse('Lote não encontrado'));
      }
      
      res.json(successResponse('Lote removido com sucesso'));
    } catch (error: any) {
      res.status(400).json(errorResponse('Erro ao remover lote', error.message));
    }
  };

  /**
   * Busca lotes por produto
   * @param req Requisição Express contendo o ID do produto
   * @param res Resposta Express
   */
  static findByProduto: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { produtoId } = req.params;
      
      if (!produtoId) {
        return res.status(400).json(errorResponse('ID do produto não informado'));
      }
      
      const lotes = await services.loteService.findByProduto(produtoId);
      res.json(successResponse('Lotes recuperados com sucesso', lotes));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar lotes por produto', error.message));
    }
  };

  /**
   * Busca lotes vencidos
   * @param req Requisição Express contendo a data de referência (opcional)
   * @param res Resposta Express
   */
  static findLotesVencidos: ControllerFunction = async (req: Request, res: Response) => {
    try {
      let dataReferencia = new Date();
      
      if (req.query.dataReferencia && typeof req.query.dataReferencia === 'string') {
        const dataRef = new Date(req.query.dataReferencia);
        
        if (!isNaN(dataRef.getTime())) {
          dataReferencia = dataRef;
        }
      }
      
      const lotes = await services.loteService.findLotesVencidos(dataReferencia);
      res.json(successResponse('Lotes vencidos recuperados com sucesso', lotes));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar lotes vencidos', error.message));
    }
  };

  /**
   * Busca lotes próximos do vencimento
   * @param req Requisição Express contendo a quantidade de dias limite e data de referência (opcionais)
   * @param res Resposta Express
   */
  static findLotesProximosVencimento: ControllerFunction = async (req: Request, res: Response) => {
    try {
      let diasLimite = 30;
      let dataReferencia = new Date();
      
      if (req.query.diasLimite && typeof req.query.diasLimite === 'string') {
        const dias = parseInt(req.query.diasLimite, 10);
        
        if (!isNaN(dias) && dias > 0) {
          diasLimite = dias;
        }
      }
      
      if (req.query.dataReferencia && typeof req.query.dataReferencia === 'string') {
        const dataRef = new Date(req.query.dataReferencia);
        
        if (!isNaN(dataRef.getTime())) {
          dataReferencia = dataRef;
        }
      }
      
      const lotes = await services.loteService.findLotesProximosVencimento(diasLimite, dataReferencia);
      res.json(successResponse('Lotes próximos do vencimento recuperados com sucesso', lotes));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar lotes próximos do vencimento', error.message));
    }
  };

  /**
   * Verifica se um lote está vencido
   * @param req Requisição Express contendo o ID do lote e a data de referência (opcional)
   * @param res Resposta Express
   */
  static verificarVencimento: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      let dataReferencia = new Date();
      
      if (req.query.dataReferencia && typeof req.query.dataReferencia === 'string') {
        const dataRef = new Date(req.query.dataReferencia);
        
        if (!isNaN(dataRef.getTime())) {
          dataReferencia = dataRef;
        }
      }
      
      const vencido = await services.loteService.verificarVencimento(id, dataReferencia);
      res.json(successResponse(
        vencido ? 'Lote está vencido' : 'Lote não está vencido',
        { vencido }
      ));
    } catch (error: any) {
      res.status(400).json(errorResponse('Erro ao verificar vencimento do lote', error.message));
    }
  };
} 