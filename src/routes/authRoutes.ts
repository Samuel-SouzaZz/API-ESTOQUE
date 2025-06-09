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
     * @swagger
     * /api/auth/register:
     *   post:
     *     tags:
     *       - Autenticação
     *     summary: Registrar novo usuário
     *     description: Cria uma nova conta de usuário no sistema
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - nome
     *               - email
     *               - senha
     *             properties:
     *               nome:
     *                 type: string
     *                 description: Nome completo do usuário
     *               email:
     *                 type: string
     *                 format: email
     *                 description: Email do usuário
     *               senha:
     *                 type: string
     *                 minLength: 6
     *                 description: Senha do usuário
     *               role:
     *                 type: string
     *                 enum: [ADMIN, MEDICO, FARMACEUTICO, PACIENTE]
     *                 default: PACIENTE
     *                 description: Papel do usuário no sistema
     *               telefone:
     *                 type: string
     *                 description: Telefone do usuário
     *               endereco:
     *                 type: string
     *                 description: Endereço do usuário
     *     responses:
     *       201:
     *         description: Usuário criado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/LoginResponse'
     *       400:
     *         description: Dados inválidos
     *       409:
     *         description: Email já cadastrado
     */
    this.router.post('/register', this.authController.register);

    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *     tags:
     *       - Autenticação
     *     summary: Login de usuário
     *     description: Autentica um usuário e retorna token JWT
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             $ref: '#/components/schemas/LoginRequest'
     *     responses:
     *       200:
     *         description: Login realizado com sucesso
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/LoginResponse'
     *       401:
     *         description: Credenciais inválidas
     *       400:
     *         description: Dados inválidos
     */
    this.router.post('/login', this.authController.login);

    /**
     * @swagger
     * /api/auth/verify:
     *   get:
     *     tags:
     *       - Autenticação
     *     summary: Verificar token JWT
     *     description: Verifica se o token JWT é válido
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Token válido
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 valid:
     *                   type: boolean
     *                 usuario:
     *                   $ref: '#/components/schemas/Usuario'
     *       401:
     *         description: Token inválido ou expirado
     */
    this.router.get('/verify', this.authController.verifyToken);

    /**
     * @swagger
     * /api/auth/me:
     *   get:
     *     tags:
     *       - Autenticação
     *     summary: Dados do usuário logado
     *     description: Retorna os dados do usuário autenticado
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Dados do usuário
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Usuario'
     *       401:
     *         description: Token inválido ou não fornecido
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