import express from 'express';
import { FornecedorController } from '../controllers/FornecedorController';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
const authMiddleware = new AuthMiddleware();

/**
 * @swagger
 * /api/fornecedores:
 *   get:
 *     tags:
 *       - Fornecedores
 *     summary: Listar todos os fornecedores
 *     description: Busca todos os fornecedores cadastrados no sistema
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
 *         description: Lista de fornecedores
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       nome:
 *                         type: string
 *                       telefone:
 *                         type: string
 *                       status:
 *                         type: string
 *                         enum: [DISPONIVEL, INDISPONIVEL]
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 */
// Rotas específicas devem vir ANTES das rotas com parâmetros
/**
 * @swagger
 * /api/fornecedores/busca/nome:
 *   get:
 *     tags:
 *       - Fornecedores
 *     summary: Buscar fornecedores por nome
 *     description: Busca fornecedores que contenham o termo no nome
 *     parameters:
 *       - in: query
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome ou parte do nome do fornecedor
 *         example: "Farmacêutica"
 *     responses:
 *       200:
 *         description: Fornecedores encontrados
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       nome:
 *                         type: string
 *                       telefone:
 *                         type: string
 *                       status:
 *                         type: string
 */
router.get('/busca/nome', FornecedorController.findByNome);

/**
 * @swagger
 * /api/fornecedores/status/{status}:
 *   get:
 *     tags:
 *       - Fornecedores
 *     summary: Buscar fornecedores por status
 *     description: Retorna todos os fornecedores com status específico
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [DISPONIVEL, INDISPONIVEL]
 *         description: Status dos fornecedores
 *         example: "DISPONIVEL"
 *     responses:
 *       200:
 *         description: Fornecedores com o status especificado
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
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       nome:
 *                         type: string
 *                       telefone:
 *                         type: string
 *                       status:
 *                         type: string
 */
router.get('/status/:status', FornecedorController.findByStatus);

// Listar todos os fornecedores
router.get('/', FornecedorController.findAll);

/**
 * @swagger
 * /api/fornecedores:
 *   post:
 *     tags:
 *       - Fornecedores
 *     summary: Cadastrar novo fornecedor
 *     description: Cria um novo fornecedor (apenas Farmacêuticos e Admins)
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
 *               - telefone
 *               - status
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do fornecedor
 *                 example: "Farmacêutica ABC Ltda"
 *               telefone:
 *                 type: string
 *                 description: Telefone de contato
 *                 example: "(11) 3333-4444"
 *               status:
 *                 type: string
 *                 enum: [DISPONIVEL, INDISPONIVEL]
 *                 default: DISPONIVEL
 *                 description: Status do fornecedor
 *     responses:
 *       201:
 *         description: Fornecedor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     nome:
 *                       type: string
 *                     telefone:
 *                       type: string
 *                     status:
 *                       type: string
 *       401:
 *         description: Acesso negado
 *       403:
 *         description: Permissão insuficiente (apenas Farmacêuticos e Admins)
 */
router.post('/', authMiddleware.authenticate, authMiddleware.farmaceuticoOnly, FornecedorController.create);

/**
 * @swagger
 * /api/fornecedores/{id}:
 *   get:
 *     tags:
 *       - Fornecedores
 *     summary: Buscar fornecedor por ID
 *     description: Retorna um fornecedor específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do fornecedor
 *         example: "5"
 *     responses:
 *       200:
 *         description: Fornecedor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     nome:
 *                       type: string
 *                     telefone:
 *                       type: string
 *                     status:
 *                       type: string
 *                       enum: [DISPONIVEL, INDISPONIVEL]
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Fornecedor não encontrado
 *   put:
 *     tags:
 *       - Fornecedores
 *     summary: Atualizar fornecedor
 *     description: Atualiza um fornecedor existente (apenas Farmacêuticos e Admins)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do fornecedor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do fornecedor
 *               telefone:
 *                 type: string
 *                 description: Telefone de contato
 *               status:
 *                 type: string
 *                 enum: [DISPONIVEL, INDISPONIVEL]
 *                 description: Status do fornecedor
 *     responses:
 *       200:
 *         description: Fornecedor atualizado com sucesso
 *       401:
 *         description: Acesso negado
 *       403:
 *         description: Permissão insuficiente
 *       404:
 *         description: Fornecedor não encontrado
 *   delete:
 *     tags:
 *       - Fornecedores
 *     summary: Remover fornecedor
 *     description: Remove um fornecedor do sistema (apenas Admins)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do fornecedor
 *     responses:
 *       200:
 *         description: Fornecedor removido com sucesso
 *       401:
 *         description: Acesso negado
 *       403:
 *         description: Permissão insuficiente (apenas Admins)
 *       404:
 *         description: Fornecedor não encontrado
 */
// IMPORTANTE: Rota /:id deve vir APÓS todas as rotas específicas
router.get('/:id', FornecedorController.findById);
router.put('/:id', authMiddleware.authenticate, authMiddleware.farmaceuticoOnly, FornecedorController.update);
router.delete('/:id', authMiddleware.authenticate, authMiddleware.adminOnly, FornecedorController.delete);

export default router; 