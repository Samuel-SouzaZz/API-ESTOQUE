import { Request, Response } from 'express';
import { repositories } from '../repositorio';

/**
 * Controller para pacientes
 * Implementa CRUD básico conforme conteúdo da disciplina
 */
export class PacienteController {
  /**
   * Busca todos os pacientes
   */
  static async findAll(req: Request, res: Response) {
    try {
      const pacientes = await repositories.pacienteRepository.findAll();
      res.json({
        success: true,
        message: 'Pacientes encontrados',
        data: pacientes
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar pacientes',
        error: error.message
      });
    }
  }

  /**
   * Busca paciente por ID
   */
  static async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const paciente = await repositories.pacienteRepository.findById(id);
      
      if (!paciente) {
        return res.status(404).json({
          success: false,
          message: 'Paciente não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Paciente encontrado',
        data: paciente
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar paciente',
        error: error.message
      });
    }
  }

  /**
   * Cria novo paciente
   */
  static async create(req: Request, res: Response) {
    try {
      const paciente = await repositories.pacienteRepository.create(req.body);
      res.status(201).json({
        success: true,
        message: 'Paciente criado',
        data: paciente
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Erro ao criar paciente',
        error: error.message
      });
    }
  }

  /**
   * Atualiza paciente
   */
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const paciente = await repositories.pacienteRepository.update(id, req.body);
      
      if (!paciente) {
        return res.status(404).json({
          success: false,
          message: 'Paciente não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Paciente atualizado',
        data: paciente
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: 'Erro ao atualizar paciente',
        error: error.message
      });
    }
  }

  /**
   * Remove paciente
   */
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await repositories.pacienteRepository.delete(id);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Paciente não encontrado'
        });
      }
      
      res.json({
        success: true,
        message: 'Paciente removido'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao remover paciente',
        error: error.message
      });
    }
  }

  /**
   * Busca por nome (filtro básico)
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
      
      const pacientes = await repositories.pacienteRepository.findByNome(nome as string);
      res.json({
        success: true,
        message: 'Busca por nome realizada',
        data: pacientes
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro na busca por nome',
        error: error.message
      });
    }
  }
} 