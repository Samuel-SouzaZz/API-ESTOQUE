import { Request, Response } from 'express';
import { ControleEstoqueService } from '../services/ControleEstoqueService';

/**
 * Controller para controle de estoque
 * Implementa operações de estoque
 */
export class ControleEstoqueController {
  private static controleEstoqueService = new ControleEstoqueService();

  /**
   * Busca todas as solicitações
   */
  static async findAll(req: Request, res: Response) {
    try {
      const controles = await ControleEstoqueController.controleEstoqueService.findAll();
      res.json({
        success: true,
        message: 'Solicitações encontradas',
        data: controles
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar solicitações',
        error: error.message
      });
    }
  }

  /**
   * Busca solicitação por ID
   */
  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const controle = await ControleEstoqueController.controleEstoqueService.findById(id);
      
      if (!controle) {
        return res.status(404).json({
          success: false,
          message: 'Solicitação não encontrada'
        });
      }
      
      res.json({
        success: true,
        message: 'Solicitação encontrada',
        data: controle
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar solicitação',
        error: error.message
      });
    }
  }

  /**
   * Cria nova solicitação
   */
  static async create(req: Request, res: Response) {
    try {
      const controle = await ControleEstoqueController.controleEstoqueService.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Solicitação criada',
        data: controle
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Erro ao criar solicitação',
        error: error.message
      });
    }
  }

  /**
   * Atualiza solicitação
   */
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const controle = await ControleEstoqueController.controleEstoqueService.update(id, req.body);
      
      if (!controle) {
        return res.status(404).json({
          success: false,
          message: 'Solicitação não encontrada'
        });
      }
      
      res.json({
        success: true,
        message: 'Solicitação atualizada',
        data: controle
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Erro ao atualizar solicitação',
        error: error.message
      });
    }
  }

  /**
   * Remove solicitação
   */
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await ControleEstoqueController.controleEstoqueService.delete(id);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Solicitação não encontrada'
        });
      }
      
      res.json({
        success: true,
        message: 'Solicitação removida'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao remover solicitação',
        error: error.message
      });
    }
  }

  /**
   * Atualiza status
   */
  static async atualizarStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Status é obrigatório'
        });
      }
      
      const controle = await ControleEstoqueController.controleEstoqueService.atualizarStatus(id, status);
      
      if (!controle) {
        return res.status(404).json({
          success: false,
          message: 'Solicitação não encontrada'
        });
      }
      
      res.json({
        success: true,
        message: 'Status atualizado',
        data: controle
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Erro ao atualizar status',
        error: error.message
      });
    }
  }

  /**
   * Busca por médico
   */
  static async findByMedico(req: Request, res: Response) {
    try {
      const { medicoId } = req.params;
      const controles = await ControleEstoqueController.controleEstoqueService.findByMedico(medicoId);
      
      // Validação seguindo Clean Code - tratamento adequado de casos edge
      if (!controles || controles.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Nenhum controle de estoque encontrado para o médico '${medicoId}'`,
          data: []
        });
      }
      
      res.json({
        success: true,
        message: `${controles.length} registro(s) de controle encontrado(s) para o médico`,
        data: controles
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro na busca por médico',
        error: error.message
      });
    }
  }

  /**
   * Busca por paciente
   */
  static async findByPaciente(req: Request, res: Response) {
    try {
      const { pacienteId } = req.params;
      const controles = await ControleEstoqueController.controleEstoqueService.findByPaciente(pacienteId);
      
      // Validação seguindo Clean Code - tratamento adequado de casos edge
      if (!controles || controles.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Nenhum controle de estoque encontrado para o paciente '${pacienteId}'`,
          data: []
        });
      }
      
      res.json({
        success: true,
        message: `${controles.length} registro(s) de controle encontrado(s) para o paciente`,
        data: controles
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro na busca por paciente',
        error: error.message
      });
    }
  }

  /**
   * Busca por status
   */
  static async findByStatus(req: Request, res: Response) {
    try {
      const { status } = req.query;
      
      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Status é obrigatório'
        });
      }
      
      const controles = await ControleEstoqueController.controleEstoqueService.findByStatus(status as string);
      
      // Validação seguindo Clean Code - tratamento adequado de casos edge
      if (!controles || controles.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Nenhum controle de estoque encontrado com status '${status}'`,
          data: []
        });
      }
      
      res.json({
        success: true,
        message: `${controles.length} registro(s) de controle encontrado(s) com status '${status}'`,
        data: controles
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro na busca por status',
        error: error.message
      });
    }
  }

  /**
   * Relatório de estoque
   */
  static async relatorio(req: Request, res: Response) {
    try {
      const relatorio = await ControleEstoqueController.controleEstoqueService.relatorio();
      
      res.json({
        success: true,
        message: 'Relatório gerado',
        data: relatorio
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao gerar relatório',
        error: error.message
      });
    }
  }
} 