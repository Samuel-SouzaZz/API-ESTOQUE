import { Request, Response } from 'express';
import { ControllerFunction, successResponse, errorResponse } from './types';
import { services } from '../services';

/**
 * Classe controladora para operações com medicamentos
 */
export class MedicamentoController {
  /**
   * Busca todos os medicamentos
   * @param req Requisição Express
   * @param res Resposta Express
   */
  static findAll: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const medicamentos = await services.medicamentoService.findAll();
      res.json(successResponse('Medicamentos recuperados com sucesso', medicamentos));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar medicamentos', error.message));
    }
  };

  /**
   * Busca um medicamento por ID
   * @param req Requisição Express contendo o ID do medicamento
   * @param res Resposta Express
   */
  static findById: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const medicamento = await services.medicamentoService.findById(id);
      
      if (!medicamento) {
        return res.status(404).json(errorResponse('Medicamento não encontrado'));
      }
      
      res.json(successResponse('Medicamento recuperado com sucesso', medicamento));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar medicamento', error.message));
    }
  };

  /**
   * Cria um novo medicamento
   * @param req Requisição Express contendo os dados do medicamento
   * @param res Resposta Express
   */
  static create: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const medicamento = await services.medicamentoService.create(req.body);
      res.status(201).json(successResponse('Medicamento criado com sucesso', medicamento));
    } catch (error: any) {
      res.status(400).json(errorResponse('Erro ao criar medicamento', error.message));
    }
  };

  /**
   * Atualiza um medicamento existente
   * @param req Requisição Express contendo o ID e dados atualizados do medicamento
   * @param res Resposta Express
   */
  static update: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const medicamento = await services.medicamentoService.update(id, req.body);
      
      if (!medicamento) {
        return res.status(404).json(errorResponse('Medicamento não encontrado'));
      }
      
      res.json(successResponse('Medicamento atualizado com sucesso', medicamento));
    } catch (error: any) {
      res.status(400).json(errorResponse('Erro ao atualizar medicamento', error.message));
    }
  };

  /**
   * Remove um medicamento
   * @param req Requisição Express contendo o ID do medicamento
   * @param res Resposta Express
   */
  static delete: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await services.medicamentoService.delete(id);
      
      if (!result) {
        return res.status(404).json(errorResponse('Medicamento não encontrado'));
      }
      
      res.json(successResponse('Medicamento removido com sucesso'));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao remover medicamento', error.message));
    }
  };

  /**
   * Busca medicamentos por nome
   * @param req Requisição Express contendo o nome a ser pesquisado
   * @param res Resposta Express
   */
  static findByNome: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { nome } = req.query;
      
      if (!nome || typeof nome !== 'string') {
        return res.status(400).json(errorResponse('Nome não informado ou inválido'));
      }
      
      const medicamentos = await services.medicamentoService.findByNome(nome);
      res.json(successResponse('Medicamentos recuperados com sucesso', medicamentos));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar medicamentos por nome', error.message));
    }
  };

  /**
   * Busca medicamentos por fornecedor
   * @param req Requisição Express contendo o ID do fornecedor
   * @param res Resposta Express
   */
  static findByFornecedor: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { fornecedorId } = req.params;
      
      if (!fornecedorId) {
        return res.status(400).json(errorResponse('ID do fornecedor não informado'));
      }
      
      const medicamentos = await services.medicamentoService.findByFornecedor(fornecedorId);
      res.json(successResponse('Medicamentos recuperados com sucesso', medicamentos));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar medicamentos por fornecedor', error.message));
    }
  };
} 