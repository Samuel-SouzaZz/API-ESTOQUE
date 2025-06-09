import { Router } from 'express';
import { MedicamentoController } from '../controllers';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = Router();
const authMiddleware = new AuthMiddleware();

/**
 * @swagger
 * /api/medicamentos:
 *   get:
 *     tags:
 *       - Medicamentos
 *     summary: Listar todos os medicamentos
 *     description: Busca todos os medicamentos cadastrados no sistema
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Itens por página
 *     responses:
 *       200:
 *         description: Lista de medicamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Medicamento'
 */
router.get('/', MedicamentoController.findAll);

/**
 * @swagger
 * /api/medicamentos/busca/nome:
 *   get:
 *     tags:
 *       - Medicamentos
 *     summary: Buscar medicamentos por nome
 *     description: Busca medicamentos que contenham o termo no nome
 *     parameters:
 *       - in: query
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome ou parte do nome do medicamento
 *     responses:
 *       200:
 *         description: Medicamentos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Medicamento'
 */
router.get('/busca/nome', MedicamentoController.findByNome);

/**
 * @swagger
 * /api/medicamentos/fornecedor/{fornecedorId}:
 *   get:
 *     tags:
 *       - Medicamentos
 *     summary: Buscar medicamentos por fornecedor
 *     description: Retorna todos os medicamentos de um fornecedor específico
 *     parameters:
 *       - in: path
 *         name: fornecedorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do fornecedor
 *     responses:
 *       200:
 *         description: Medicamentos do fornecedor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Medicamento'
 */
router.get('/fornecedor/:fornecedorId', MedicamentoController.findByFornecedor);

/**
 * @swagger
 * /api/medicamentos:
 *   post:
 *     tags:
 *       - Medicamentos
 *     summary: Cadastrar novo medicamento
 *     description: Cria um novo medicamento (apenas Farmacêuticos e Admins)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - descricao
 *               - fabricante
 *               - preco
 *               - categoria_id
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do medicamento
 *               descricao:
 *                 type: string
 *                 description: Descrição do medicamento
 *               fabricante:
 *                 type: string
 *                 description: Fabricante do medicamento
 *               preco:
 *                 type: number
 *                 format: decimal
 *                 description: Preço unitário
 *               categoria_id:
 *                 type: string
 *                 description: ID da categoria
 *     responses:
 *       201:
 *         description: Medicamento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Medicamento'
 *       401:
 *         description: Acesso negado
 *       403:
 *         description: Permissão insuficiente (apenas Farmacêuticos e Admins)
 */
router.post('/', authMiddleware.authenticate, authMiddleware.farmaceuticoOnly, MedicamentoController.create);

/**
 * @swagger
 * /api/medicamentos/{id}:
 *   get:
 *     tags:
 *       - Medicamentos
 *     summary: Buscar medicamento por ID
 *     description: Retorna um medicamento específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do medicamento
 *         example: "2"
 *     responses:
 *       200:
 *         description: Medicamento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Medicamento'
 *       404:
 *         description: Medicamento não encontrado
 *   put:
 *     tags:
 *       - Medicamentos
 *     summary: Atualizar medicamento
 *     description: Atualiza um medicamento existente (apenas Farmacêuticos e Admins)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do medicamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               descricao:
 *                 type: string
 *               fabricante:
 *                 type: string
 *               preco:
 *                 type: number
 *                 format: decimal
 *               categoria_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Medicamento atualizado com sucesso
 *       401:
 *         description: Acesso negado
 *       403:
 *         description: Permissão insuficiente
 *       404:
 *         description: Medicamento não encontrado
 *   delete:
 *     tags:
 *       - Medicamentos
 *     summary: Remover medicamento
 *     description: Remove um medicamento do sistema (apenas Admins)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do medicamento
 *     responses:
 *       200:
 *         description: Medicamento removido com sucesso
 *       401:
 *         description: Acesso negado
 *       403:
 *         description: Permissão insuficiente (apenas Admins)
 *       404:
 *         description: Medicamento não encontrado
 */
// IMPORTANTE: Rota /:id deve vir APÓS todas as rotas específicas
router.get('/:id', MedicamentoController.findById);
router.put('/:id', authMiddleware.authenticate, authMiddleware.farmaceuticoOnly, MedicamentoController.update);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.adminOnly, MedicamentoController.delete);

export default router; 