import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';
import { UserRole } from '../enums/UserRole';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Registra um novo usuário
   * POST /auth/register
   */
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nome, email, senha, role } = req.body;

      // Validações básicas
      if (!nome || !email || !senha) {
        res.status(400).json({
          error: 'Dados obrigatórios',
          message: 'Nome, email e senha são obrigatórios'
        });
        return;
      }

      // Validação de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({
          error: 'Email inválido',
          message: 'Por favor, forneça um email válido'
        });
        return;
      }

      // Validação de senha
      if (senha.length < 6) {
        res.status(400).json({
          error: 'Senha inválida',
          message: 'A senha deve ter pelo menos 6 caracteres'
        });
        return;
      }

      // Validação de role
      const validRoles = Object.values(UserRole);
      const userRole = role || UserRole.PACIENTE;
      
      if (!validRoles.includes(userRole)) {
        res.status(400).json({
          error: 'Role inválido',
          message: `Role deve ser um dos seguintes: ${validRoles.join(', ')}`
        });
        return;
      }

      // Registra o usuário
      const novoUsuario = await this.authService.register(nome, email, senha, userRole);

      // Remove a senha do retorno
      const { senha: _, ...usuarioSemSenha } = novoUsuario;

      res.status(201).json({
        message: 'Usuário registrado com sucesso',
        usuario: usuarioSemSenha
      });

    } catch (error: any) {
      if (error.message === 'Usuário já existe com este email') {
        res.status(409).json({
          error: 'Conflito',
          message: error.message
        });
        return;
      }

      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Erro ao registrar usuário'
      });
    }
  };

  /**
   * Faz login do usuário
   * POST /auth/login
   */
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, senha } = req.body;

      // Validações básicas
      if (!email || !senha) {
        res.status(400).json({
          error: 'Dados obrigatórios',
          message: 'Email e senha são obrigatórios'
        });
        return;
      }

      // Faz o login
      const resultado = await this.authService.login(email, senha);

      res.status(200).json({
        message: 'Login realizado com sucesso',
        ...resultado
      });

    } catch (error: any) {
      if (error.message === 'Email ou senha incorretos') {
        res.status(401).json({
          error: 'Credenciais inválidas',
          message: error.message
        });
        return;
      }

      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Erro ao fazer login'
      });
    }
  };

  /**
   * Verifica se o token é válido
   * GET /auth/verify
   */
  verifyToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        res.status(401).json({
          error: 'Token não fornecido',
          message: 'Token de acesso requerido'
        });
        return;
      }

      const [bearer, token] = authHeader.split(' ');
      
      if (bearer !== 'Bearer' || !token) {
        res.status(401).json({
          error: 'Formato de token inválido',
          message: 'Use o formato: Bearer <token>'
        });
        return;
      }

      // Verifica o token
      const decoded = this.authService.verifyToken(token);

      res.status(200).json({
        message: 'Token válido',
        usuario: {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role
        }
      });

    } catch (error: any) {
      res.status(401).json({
        error: 'Token inválido',
        message: error.message
      });
    }
  };

  /**
   * Retorna informações do usuário logado
   * GET /auth/me
   */
  me = async (req: Request, res: Response): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          error: 'Usuário não autenticado',
          message: 'Faça login para acessar este recurso'
        });
        return;
      }

      res.status(200).json({
        message: 'Dados do usuário',
        usuario: req.user
      });

    } catch (error: any) {
      res.status(500).json({
        error: 'Erro interno do servidor',
        message: 'Erro ao buscar dados do usuário'
      });
    }
  };
}