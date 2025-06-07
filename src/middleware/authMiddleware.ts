import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { UserRole } from '../models/enums/UserRole';

// Estendendo a interface Request para incluir o usuário
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        name: string;
        email: string;
        role: UserRole;
      };
    }
  }
}

export class AuthMiddleware {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  /**
   * Middleware para verificar se o usuário está autenticado
   */
  authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Pega o token do header Authorization
      const authHeader = req.headers.authorization;
      
      if (!authHeader) {
        res.status(401).json({ 
          error: 'Token de acesso requerido',
          message: 'Faça login para acessar este recurso'
        });
        return;
      }

      // Verifica se o token está no formato "Bearer <token>"
      const [bearer, token] = authHeader.split(' ');
      
      if (bearer !== 'Bearer' || !token) {
        res.status(401).json({ 
          error: 'Formato de token inválido',
          message: 'Use o formato: Bearer <token>'
        });
        return;
      }

      // Verifica e decodifica o token
      const decoded = this.authService.verifyToken(token);
      
      // Adiciona os dados do usuário na requisição
      req.user = {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role
      };

      next();
    } catch (error: any) {
      res.status(401).json({ 
        error: 'Token inválido',
        message: error.message
      });
    }
  };

  /**
   * Middleware para verificar autorização baseada em roles
   */
  authorize = (allowedRoles: UserRole[]) => {
    return (req: Request, res: Response, next: NextFunction): void => {
      try {
        // Verifica se o usuário está autenticado
        if (!req.user) {
          res.status(401).json({ 
            error: 'Usuário não autenticado',
            message: 'Faça login para acessar este recurso'
          });
          return;
        }

        // Verifica se o usuário tem permissão para acessar o recurso
        if (!allowedRoles.includes(req.user.role)) {
          res.status(403).json({ 
            error: 'Acesso negado',
            message: 'Você não tem permissão para acessar este recurso'
          });
          return;
        }

        next();
      } catch (error: any) {
        res.status(500).json({ 
          error: 'Erro interno do servidor',
          message: error.message
        });
      }
    };
  };

  /**
   * Middleware específico para admins
   */
  adminOnly = this.authorize([UserRole.ADMIN]);

  /**
   * Middleware específico para médicos
   */
  medicoOnly = this.authorize([UserRole.MEDICO, UserRole.ADMIN]);

  /**
   * Middleware específico para farmacêuticos
   */
  farmaceuticoOnly = this.authorize([UserRole.FARMACEUTICO, UserRole.ADMIN]);

  /**
   * Middleware para médicos e farmacêuticos
   */
  profissionaisOnly = this.authorize([UserRole.MEDICO, UserRole.FARMACEUTICO, UserRole.ADMIN]);
} 