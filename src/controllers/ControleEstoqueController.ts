import { Request, Response } from 'express';
import { ControllerFunction, successResponse, errorResponse } from './types';
import { services } from '../services';

/**
 * Classe controladora para operações com controle de estoque
 */
export class ControleEstoqueController {
  /**
   * Busca todos os registros de controle de estoque
   * @param req Requisição Express
   * @param res Resposta Express
   */
  static findAll: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const controles = await services.controleEstoqueService.findAll();
      res.json(successResponse('Solicitações recuperadas com sucesso', controles));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar solicitações', error.message));
    }
  };

  /**
   * Busca um registro de controle de estoque por ID
   * @param req Requisição Express contendo o ID do controle
   * @param res Resposta Express
   */
  static findById: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const controle = await services.controleEstoqueService.findById(id);
      
      if (!controle) {
        return res.status(404).json(errorResponse('Solicitação não encontrada'));
      }
      
      res.json(successResponse('Solicitação recuperada com sucesso', controle));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar solicitação', error.message));
    }
  };

  /**
   * Cria um novo registro de controle de estoque (solicitação de medicamento)
   * @param req Requisição Express contendo os dados da solicitação
   * @param res Resposta Express
   */
  static create: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const controle = await services.controleEstoqueService.create(req.body);
      res.status(201).json(successResponse('Solicitação criada com sucesso', controle));
    } catch (error: any) {
      res.status(400).json(errorResponse('Erro ao criar solicitação', error.message));
    }
  };

  /**
   * Atualiza um registro de controle de estoque existente
   * @param req Requisição Express contendo o ID e dados atualizados da solicitação
   * @param res Resposta Express
   */
  static update: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const controle = await services.controleEstoqueService.update(id, req.body);
      
      if (!controle) {
        return res.status(404).json(errorResponse('Solicitação não encontrada'));
      }
      
      res.json(successResponse('Solicitação atualizada com sucesso', controle));
    } catch (error: any) {
      res.status(400).json(errorResponse('Erro ao atualizar solicitação', error.message));
    }
  };

  /**
   * Remove um registro de controle de estoque
   * @param req Requisição Express contendo o ID da solicitação
   * @param res Resposta Express
   */
  static delete: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const result = await services.controleEstoqueService.delete(id);
      
      if (!result) {
        return res.status(404).json(errorResponse('Solicitação não encontrada'));
      }
      
      res.json(successResponse('Solicitação removida com sucesso'));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao remover solicitação', error.message));
    }
  };

  /**
   * Atualiza o status de um controle de estoque
   * @param req Requisição Express contendo o ID da solicitação e o novo status
   * @param res Resposta Express
   */
  static atualizarStatus: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json(errorResponse('Status não informado'));
      }
      
      const controle = await services.controleEstoqueService.atualizarStatus(id, status);
      
      if (!controle) {
        return res.status(404).json(errorResponse('Solicitação não encontrada'));
      }
      
      res.json(successResponse('Status da solicitação atualizado com sucesso', controle));
    } catch (error: any) {
      res.status(400).json(errorResponse('Erro ao atualizar status da solicitação', error.message));
    }
  };

  /**
   * Busca solicitações por médico
   * @param req Requisição Express contendo o ID do médico
   * @param res Resposta Express
   */
  static findByMedico: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { medicoId } = req.params;
      
      if (!medicoId) {
        return res.status(400).json(errorResponse('ID do médico não informado'));
      }
      
      const controles = await services.controleEstoqueService.findByMedico(medicoId);
      res.json(successResponse('Solicitações recuperadas com sucesso', controles));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar solicitações por médico', error.message));
    }
  };

  /**
   * Busca solicitações por paciente
   * @param req Requisição Express contendo o ID do paciente
   * @param res Resposta Express
   */
  static findByPaciente: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { pacienteId } = req.params;
      
      if (!pacienteId) {
        return res.status(400).json(errorResponse('ID do paciente não informado'));
      }
      
      const controles = await services.controleEstoqueService.findByPaciente(pacienteId);
      res.json(successResponse('Solicitações recuperadas com sucesso', controles));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar solicitações por paciente', error.message));
    }
  };

  /**
   * Busca solicitações por status
   * @param req Requisição Express contendo o status a ser filtrado
   * @param res Resposta Express
   */
  static findByStatus: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { status } = req.query;
      
      if (!status || typeof status !== 'string') {
        return res.status(400).json(errorResponse('Status não informado ou inválido'));
      }
      
      const controles = await services.controleEstoqueService.findByStatus(status);
      res.json(successResponse('Solicitações recuperadas com sucesso', controles));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao buscar solicitações por status', error.message));
    }
  };

  /**
   * Gera relatório de solicitações por período
   * @param req Requisição Express contendo as datas de início e fim
   * @param res Resposta Express
   */
  static relatorio: ControllerFunction = async (req: Request, res: Response) => {
    try {
      const { dataInicio, dataFim } = req.query;
      
      if (!dataInicio || !dataFim || typeof dataInicio !== 'string' || typeof dataFim !== 'string') {
        return res.status(400).json(errorResponse('Datas de início e fim são obrigatórias'));
      }
      
      const inicio = new Date(dataInicio);
      const fim = new Date(dataFim);
      
      if (isNaN(inicio.getTime()) || isNaN(fim.getTime())) {
        return res.status(400).json(errorResponse('Formato de data inválido'));
      }
      
      const relatorio = await services.controleEstoqueService.relatorioSolicitacoesPorPeriodo(inicio, fim);
      res.json(successResponse('Relatório gerado com sucesso', relatorio));
    } catch (error: any) {
      res.status(500).json(errorResponse('Erro ao gerar relatório', error.message));
    }
  };
} 