import { Request, Response } from 'express';
import { MedicamentoService } from '../services/MedicamentoService';

/**
 * Controller para operações com medicamentos
 * Implementa CRUD básico conforme conteúdo da disciplina
 */
export class MedicamentoController {
  private static medicamentoService = new MedicamentoService();

  /**
   * Busca todos os medicamentos
   */
  static async findAll(req: Request, res: Response) {
    try {
      const medicamentos = await MedicamentoController.medicamentoService.findAll();
      res.json({
        success: true,
        message: 'Medicamentos recuperados com sucesso',
        data: medicamentos
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar medicamentos',
        error: error.message
      });
    }
  }

  /**
   * Busca medicamento por ID
   */
  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const medicamento = await MedicamentoController.medicamentoService.findById(id);
      
      if (!medicamento) {
        return res.status(404).json({
          success: false,
          message: 'Medicamento não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Medicamento encontrado',
        data: medicamento
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar medicamento',
        error: error.message
      });
    }
  }

  /**
   * Cria novo medicamento
   */
  static async create(req: Request, res: Response) {
    try {
      const medicamento = await MedicamentoController.medicamentoService.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Medicamento criado com sucesso',
        data: medicamento
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Erro ao criar medicamento',
        error: error.message
      });
    }
  }

  /**
   * Atualiza medicamento
   */
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const medicamento = await MedicamentoController.medicamentoService.update(id, req.body);
      
      if (!medicamento) {
        return res.status(404).json({
          success: false,
          message: 'Medicamento não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Medicamento atualizado',
        data: medicamento
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Erro ao atualizar medicamento',
        error: error.message
      });
    }
  }

  /**
   * Remove medicamento
   */
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await MedicamentoController.medicamentoService.delete(id);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Medicamento não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Medicamento removido'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao remover medicamento',
        error: error.message
      });
    }
  }

  /**
   * Busca por nome (filtro básico conforme matéria)
   */
  static async findByNome(req: Request, res: Response) {
    try {
      const { nome } = req.query;
      
      if (!nome) {
        return res.status(400).json({
          success: false,
          message: 'Nome é obrigatório'
        });
      }
      
      const medicamentos = await MedicamentoController.medicamentoService.findByNome(nome as string);
      res.json({
        success: true,
        message: 'Busca por nome realizada',
        data: medicamentos
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro na busca por nome',
        error: error.message
      });
    }
  }

  /**
   * Busca por fornecedor (filtro básico conforme matéria)
   */
  static async findByFornecedor(req: Request, res: Response) {
    try {
      const { fornecedorId } = req.params;
      const medicamentos = await MedicamentoController.medicamentoService.findByFornecedor(fornecedorId);
      
      res.json({
        success: true,
        message: 'Busca por fornecedor realizada',
        data: medicamentos
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro na busca por fornecedor',
        error: error.message
      });
    }
  }
} 