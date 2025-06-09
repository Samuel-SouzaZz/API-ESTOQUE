import { Request, Response } from 'express';
import { FornecedorService } from '../services/FornecedorService';

/**
 * Controller para fornecedores
 * Implementa CRUD completo
 */
export class FornecedorController {
  private static fornecedorService = new FornecedorService();
  /**
   * Busca todos os fornecedores
   */
  static async findAll(req: Request, res: Response) {
    try {
      const fornecedores = await FornecedorController.fornecedorService.findAll();
      res.json({
        success: true,
        message: 'Fornecedores encontrados',
        data: fornecedores
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar fornecedores',
        error: error.message
      });
    }
  }

  /**
   * Busca fornecedor por ID
   */
  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const fornecedor = await FornecedorController.fornecedorService.findById(id);
      
      if (!fornecedor) {
        return res.status(404).json({
          success: false,
          message: 'Fornecedor não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Fornecedor encontrado',
        data: fornecedor
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar fornecedor',
        error: error.message
      });
    }
  }

  /**
   * Cria novo fornecedor
   */
  static async create(req: Request, res: Response) {
    try {
      const fornecedor = await FornecedorController.fornecedorService.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Fornecedor criado',
        data: fornecedor
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Erro ao criar fornecedor',
        error: error.message
      });
    }
  }

  /**
   * Atualiza fornecedor
   */
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const fornecedor = await FornecedorController.fornecedorService.update(id, req.body);
      
      if (!fornecedor) {
        return res.status(404).json({
          success: false,
          message: 'Fornecedor não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Fornecedor atualizado',
        data: fornecedor
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Erro ao atualizar fornecedor',
        error: error.message
      });
    }
  }

  /**
   * Remove fornecedor
   */
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await FornecedorController.fornecedorService.delete(id);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Fornecedor não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Fornecedor removido'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao remover fornecedor',
        error: error.message
      });
    }
  }

  /**
   * Busca por nome
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
      
      const fornecedores = await FornecedorController.fornecedorService.findByNome(nome as string);
      
      // Validação seguindo Clean Code - tratamento adequado de casos edge
      if (!fornecedores || fornecedores.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Nenhum fornecedor encontrado com o nome '${nome}'`,
          data: []
        });
      }
      
      res.json({
        success: true,
        message: `${fornecedores.length} fornecedor(es) encontrado(s)`,
        data: fornecedores
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
   * Busca por status
   */
  static async findByStatus(req: Request, res: Response) {
    try {
      const { status } = req.params;
      const fornecedores = await FornecedorController.fornecedorService.findByStatus(status);
      
      // Validação seguindo Clean Code - tratamento adequado de casos edge
      if (!fornecedores || fornecedores.length === 0) {
        return res.status(404).json({
          success: false,
          message: `Nenhum fornecedor encontrado com status '${status}'`,
          data: []
        });
      }
      
      res.json({
        success: true,
        message: `${fornecedores.length} fornecedor(es) encontrado(s) com status '${status}'`,
        data: fornecedores
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro na busca por status',
        error: error.message
      });
    }
  }
} 