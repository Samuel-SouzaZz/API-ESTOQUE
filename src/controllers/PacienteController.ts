import { Request, Response } from 'express';
import { ControllerFunction, successResponse, errorResponse } from './types';
import { repositories } from '../repositorio';

/**
 * Classe controladora para operações com pacientes
 */
export class PacienteController {
  /**
   * Busca todos os pacientes
   * @param req Requisição Express
   * @param res Resposta Express
   */
  static findAll: ControllerFunction = async (req: Request, res: Response): Promise<void> => {
    try {
      const pacientes = await repositories.pacienteRepository.findAll();
      res.json(successResponse('Pacientes recuperados com sucesso', pacientes));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar pacientes', error.message));
    }
  };

  /**
   * Busca um paciente por ID
   * @param req Requisição Express contendo o ID do paciente
   * @param res Resposta Express
   */
  static findById: ControllerFunction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const paciente = await repositories.pacienteRepository.findById(id);
      
      if (!paciente) {
        res.status(404).json(errorResponse('Paciente não encontrado'));
        return;
      }
      
      res.json(successResponse('Paciente recuperado com sucesso', paciente));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar paciente', error.message));
    }
  };

  /**
   * Cria um novo paciente
   * @param req Requisição Express contendo os dados do paciente
   * @param res Resposta Express
   */
  static create: ControllerFunction = async (req: Request, res: Response): Promise<void> => {
    try {
      const paciente = await repositories.pacienteRepository.create(req.body);
      res.status(201).json(successResponse('Paciente criado com sucesso', paciente));
    } catch (error: any) {
      res.status(400).json(errorResponse('Erro ao criar paciente', error.message));
    }
  };

  /**
   * Atualiza um paciente existente
   * @param req Requisição Express contendo o ID e dados atualizados do paciente
   * @param res Resposta Express
   */
  static update: ControllerFunction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const paciente = await repositories.pacienteRepository.update(id, req.body);
      
      if (!paciente) {
        res.status(404).json(errorResponse('Paciente não encontrado'));
        return;
      }
      
      res.json(successResponse('Paciente atualizado com sucesso', paciente));
    } catch (error: any) {
      res.status(400).json(errorResponse('Erro ao atualizar paciente', error.message));
    }
  };

  /**
   * Remove um paciente
   * @param req Requisição Express contendo o ID do paciente
   * @param res Resposta Express
   */
  static delete: ControllerFunction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const result = await repositories.pacienteRepository.delete(id);
      
      if (!result) {
        res.status(404).json(errorResponse('Paciente não encontrado'));
        return;
      }
      
      res.json(successResponse('Paciente removido com sucesso'));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao remover paciente', error.message));
    }
  };

  /**
   * Busca pacientes por nome
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
      
      const pacientes = await repositories.pacienteRepository.findByNome(nome);
      res.json(successResponse('Pacientes recuperados com sucesso', pacientes));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar pacientes por nome', error.message));
    }
  };
} 