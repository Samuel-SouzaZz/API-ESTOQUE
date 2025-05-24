import { Router, Request, Response } from 'express';
import { AuthMiddleware } from '../middleware/authMiddleware';
import { UserRole } from '../enums/UserRole';

export class ProtectedExamplesRoutes {
  private router: Router;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @route GET /protected/admin
     * @desc Rota exclusiva para ADMIN
     * @access Private - Apenas ADMIN
     */
    this.router.get('/admin', 
      this.authMiddleware.authenticate,
      this.authMiddleware.adminOnly,
      this.adminOnlyRoute
    );

    /**
     * @route GET /protected/medico
     * @desc Rota para MEDICO e ADMIN
     * @access Private - MEDICO ou ADMIN
     */
    this.router.get('/medico',
      this.authMiddleware.authenticate,
      this.authMiddleware.medicoOnly,
      this.medicoRoute
    );

    /**
     * @route GET /protected/farmaceutico
     * @desc Rota para FARMACEUTICO e ADMIN
     * @access Private - FARMACEUTICO ou ADMIN
     */
    this.router.get('/farmaceutico',
      this.authMiddleware.authenticate,
      this.authMiddleware.farmaceuticoOnly,
      this.farmaceuticoRoute
    );

    /**
     * @route GET /protected/profissionais
     * @desc Rota para MEDICO, FARMACEUTICO e ADMIN
     * @access Private - Profissionais de saúde
     */
    this.router.get('/profissionais',
      this.authMiddleware.authenticate,
      this.authMiddleware.profissionaisOnly,
      this.profissionaisRoute
    );

    /**
     * @route GET /protected/paciente
     * @desc Rota para PACIENTE (exemplo de consulta próprios dados)
     * @access Private - Qualquer usuário autenticado
     */
    this.router.get('/paciente',
      this.authMiddleware.authenticate,
      this.pacienteRoute
    );

    /**
     * @route GET /protected/usuarios
     * @desc Rota para listar usuários com permissões baseadas no role
     * @access Private - Diferentes visualizações por role
     */
    this.router.get('/usuarios',
      this.authMiddleware.authenticate,
      this.usuariosComPermissoes
    );
  }

  /**
   * Rota exclusiva para administradores
   */
  private adminOnlyRoute = (req: Request, res: Response): void => {
    res.json({
      message: 'Área administrativa',
      usuario: req.user,
      permissoes: [
        'Gerenciar todos os usuários',
        'Acessar relatórios completos',
        'Configurar sistema',
        'Backup e restore'
      ]
    });
  };

  /**
   * Rota para médicos
   */
  private medicoRoute = (req: Request, res: Response): void => {
    res.json({
      message: 'Área médica',
      usuario: req.user,
      permissoes: [
        'Prescrever medicamentos',
        'Acessar histórico de pacientes',
        'Gerar relatórios médicos',
        'Consultar estoque de medicamentos'
      ]
    });
  };

  /**
   * Rota para farmacêuticos
   */
  private farmaceuticoRoute = (req: Request, res: Response): void => {
    res.json({
      message: 'Área farmacêutica',
      usuario: req.user,
      permissoes: [
        'Dispensar medicamentos',
        'Controlar estoque',
        'Registrar lotes',
        'Verificar validade'
      ]
    });
  };

  /**
   * Rota para profissionais de saúde
   */
  private profissionaisRoute = (req: Request, res: Response): void => {
    res.json({
      message: 'Área profissionais de saúde',
      usuario: req.user,
      permissoes: [
        'Acessar dados de pacientes',
        'Consultar medicamentos',
        'Gerar relatórios',
        'Comunicação inter-profissional'
      ]
    });
  };

  /**
   * Rota para pacientes
   */
  private pacienteRoute = (req: Request, res: Response): void => {
    res.json({
      message: 'Área do paciente',
      usuario: req.user,
      permissoes: [
        'Visualizar próprios dados',
        'Histórico de medicamentos',
        'Consultar prescrições',
        'Agendar consultas'
      ]
    });
  };

  /**
   * Exemplo de rota com permissões condicionais baseadas no role
   */
  private usuariosComPermissoes = (req: Request, res: Response): void => {
    const { role } = req.user!;

    switch (role) {
      case UserRole.ADMIN:
        res.json({
          message: 'Lista completa de usuários (ADMIN)',
          dados: 'Todos os usuários com dados sensíveis',
          usuario: req.user
        });
        break;

      case UserRole.MEDICO:
        res.json({
          message: 'Lista de pacientes e farmacêuticos (MÉDICO)',
          dados: 'Usuários relevantes para prática médica',
          usuario: req.user
        });
        break;

      case UserRole.FARMACEUTICO:
        res.json({
          message: 'Lista de médicos e dados básicos (FARMACÊUTICO)', 
          dados: 'Usuários relevantes para dispensação',
          usuario: req.user
        });
        break;

      case UserRole.PACIENTE:
        res.json({
          message: 'Dados próprios (PACIENTE)',
          dados: 'Apenas informações pessoais',
          usuario: req.user
        });
        break;

      default:
        res.status(403).json({
          error: 'Role não reconhecido'
        });
    }
  };

  public getRouter(): Router {
    return this.router;
  }
}

// Exporta uma instância do router
const protectedExamplesRoutes = new ProtectedExamplesRoutes();
export default protectedExamplesRoutes.getRouter(); 