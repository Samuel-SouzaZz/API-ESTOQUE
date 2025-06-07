import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { UserRole } from '../models/enums/UserRole';

/**
 * Controller de autenticação
 * Implementa JWT conforme conteúdo da disciplina
 */
export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Registro de usuário
   */
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nome, email, senha, role } = req.body;

      // Validações básicas conforme matéria
      if (!nome || !email || !senha) {
        res.status(400).json({
          success: false,
          message: 'Nome, email e senha são obrigatórios'
        });
        return;
      }

      const userRole = role || UserRole.PACIENTE;
      const novoUsuario = await this.authService.register(nome, email, senha, userRole);

      // Remove a senha do retorno (DTO conforme matéria)
      const { senha: _, ...usuarioSemSenha } = novoUsuario;

      res.status(201).json({
        success: true,
        message: 'Usuário registrado com sucesso',
        data: usuarioSemSenha
      });

    } catch (error: any) {
      if (error.message === 'Usuário já existe com este email') {
        res.status(409).json({
          success: false,
          message: error.message
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Erro ao registrar usuário',
        error: error.message
      });
    }
  };

  /**
   * Login de usuário
   */
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, senha } = req.body;

      // Validações básicas conforme matéria
      if (!email || !senha) {
        res.status(400).json({
          success: false,
          message: 'Email e senha são obrigatórios'
        });
        return;
      }

      // Faz o login e gera JWT conforme matéria
      const resultado = await this.authService.login(email, senha);

      res.status(200).json({
        success: true,
        message: 'Login realizado com sucesso',
        data: resultado
      });

    } catch (error: any) {
      if (error.message === 'Email ou senha incorretos') {
        res.status(401).json({
          success: false,
          message: error.message
        });
        return;
      }

      res.status(500).json({
        success: false,
        message: 'Erro ao fazer login',
        error: error.message
      });
    }
  };

  /**
   * Verifica token JWT (conforme matéria)
   */
  verifyToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        res.status(401).json({
          success: false,
          message: 'Token não fornecido'
        });
        return;
      }

      const [bearer, token] = authHeader.split(' ');
      
      if (bearer !== 'Bearer' || !token) {
        res.status(401).json({
          success: false,
          message: 'Formato inválido. Use: Bearer <token>'
        });
        return;
      }

      // Verifica o token conforme matéria
      const decoded = this.authService.verifyToken(token);

      res.status(200).json({
        success: true,
        message: 'Token válido',
        data: {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role
        }
      });

    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: 'Token inválido',
        error: error.message
      });
    }
  };

  /**
   * Dados do usuário logado (rota protegida conforme matéria)
   */
  me = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Usuário não autenticado'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Dados do usuário',
        data: req.user
      });

    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: 'Erro ao buscar dados do usuário',
        error: error.message
      });
    }
  };
}