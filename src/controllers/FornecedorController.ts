import { Request, Response } from 'express';
import { ControllerFunction, successResponse, errorResponse } from './types';
import { repositories } from '../repositorio';

/**
 * Classe controladora para operações com fornecedores
 */
export class FornecedorController {
  /**
   * Busca todos os fornecedores
   * @param req Requisição Express
   * @param res Resposta Express
   */
  static findAll: ControllerFunction = async (req: Request, res: Response): Promise<void> => {
    try {
      const fornecedores = await repositories.fornecedorRepository.findAll();
      res.json(successResponse('Fornecedores recuperados com sucesso', fornecedores));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar fornecedores', error.message));
    }
  };

  /**
   * Busca um fornecedor por ID
   * @param req Requisição Express contendo o ID do fornecedor
   * @param res Resposta Express
   */
  static findById: ControllerFunction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const fornecedor = await repositories.fornecedorRepository.findById(id);
      
      if (!fornecedor) {
        res.status(404).json(errorResponse('Fornecedor não encontrado'));
        return;
      }
      
      res.json(successResponse('Fornecedor recuperado com sucesso', fornecedor));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar fornecedor', error.message));
    }
  };

  /**
   * Cria um novo fornecedor
   * @param req Requisição Express contendo os dados do fornecedor
   * @param res Resposta Express
   */
  static create: ControllerFunction = async (req: Request, res: Response): Promise<void> => {
    try {
      const fornecedor = await repositories.fornecedorRepository.create(req.body);
      res.status(201).json(successResponse('Fornecedor criado com sucesso', fornecedor));
    } catch (error: any) {
      res.status(400).json(errorResponse('Erro ao criar fornecedor', error.message));
    }
  };

  /**
   * Atualiza um fornecedor existente
   * @param req Requisição Express contendo o ID e dados atualizados do fornecedor
   * @param res Resposta Express
   */
  static update: ControllerFunction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const fornecedor = await repositories.fornecedorRepository.update(id, req.body);
      
      if (!fornecedor) {
        res.status(404).json(errorResponse('Fornecedor não encontrado'));
        return;
      }
      
      res.json(successResponse('Fornecedor atualizado com sucesso', fornecedor));
    } catch (error: any) {
      res.status(400).json(errorResponse('Erro ao atualizar fornecedor', error.message));
    }
  };

  /**
   * Remove um fornecedor
   * @param req Requisição Express contendo o ID do fornecedor
   * @param res Resposta Express
   */
  static delete: ControllerFunction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await repositories.fornecedorRepository.delete(id);
      
      if (!result) {
        res.status(404).json(errorResponse('Fornecedor não encontrado'));
        return;
      }
      
      res.json(successResponse('Fornecedor removido com sucesso'));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao remover fornecedor', error.message));
    }
  };

  /**
   * Busca fornecedores por nome
   * @param req Requisição Express contendo o nome a ser pesquisado
   * @param res Resposta Express
   */
  static findByNome: ControllerFunction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nome } = req.query;
      
      if (!nome || typeof nome !== 'string') {
        res.status(400).json(errorResponse('Nome não informado ou inválido'));
        return;
      }
      
      const fornecedores = await repositories.fornecedorRepository.findByNome(nome);
      res.json(successResponse('Fornecedores recuperados com sucesso', fornecedores));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar fornecedores por nome', error.message));
    }
  };

  /**
   * Busca fornecedores por status
   * @param req Requisição Express contendo o status a ser filtrado
   * @param res Resposta Express
   */
  static findByStatus: ControllerFunction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { status } = req.params;
      
      if (!status) {
        res.status(400).json(errorResponse('Status não informado'));
        return;
      }
      
      const fornecedores = await repositories.fornecedorRepository.findByStatus(status);
      res.json(successResponse('Fornecedores recuperados com sucesso', fornecedores));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar fornecedores por status', error.message));
    }
  };
} 