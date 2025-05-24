import { Router } from 'express';
import { AuthController } from '../controllers/AuthControllers';
import { AuthMiddleware } from '../middleware/authMiddleware';

export class AuthRoutes {
  private router: Router;
  private authController: AuthController;
  private authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.authController = new AuthController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @route POST /auth/register
     * @desc Registrar novo usuário
     * @access Public
     * @body { nome, email, senha, role? }
     */
    this.router.post('/register', this.authController.register);

    /**
     * @route POST /auth/login  
     * @desc Login de usuário
     * @access Public
     * @body { email, senha }
     */
    this.router.post('/login', this.authController.login);

    /**
     * @route GET /auth/verify
     * @desc Verificar validade do token
     * @access Public (mas requer token)
     * @headers { Authorization: Bearer <token> }
     */
    this.router.get('/verify', this.authController.verifyToken);

    /**
     * @route GET /auth/me
     * @desc Obter dados do usuário logado
     * @access Private
     * @headers { Authorization: Bearer <token> }
     */
    this.router.get('/me', this.authMiddleware.authenticate, this.authController.me);
  }

  public getRouter(): Router {
    return this.router;
  }
}

// Exporta uma instância do router
const authRoutes = new AuthRoutes();
export default authRoutes.getRouter(); 