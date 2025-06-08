import { Router } from 'express';
import { ControleEstoqueController } from '../controllers';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = Router();
const authMiddleware = new AuthMiddleware();

/**
 * @swagger
 * /api/controle-estoque:
 *   get:
 *     tags:
 *       - Controle de Estoque
 *     summary: Listar solicitações de medicamentos
 *     description: Busca todas as solicitações de medicamentos (apenas profissionais de saúde)
 *     security:
 *       - bearerAuth: []
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
 *         description: Lista de solicitações
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
 *                     $ref: '#/components/schemas/Estoque'
 *       401:
 *         description: Acesso negado
 *       403:
 *         description: Apenas profissionais de saúde
 */
router.get('/', authMiddleware.authenticate, authMiddleware.profissionaisOnly, ControleEstoqueController.findAll);

/**
 * @swagger
 * /api/controle-estoque/{id}:
 *   get:
 *     tags:
 *       - Controle de Estoque
 *     summary: Buscar solicitação por ID
 *     description: Retorna uma solicitação específica pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da solicitação
 *     responses:
 *       200:
 *         description: Solicitação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Estoque'
 *       401:
 *         description: Acesso negado
 *       404:
 *         description: Solicitação não encontrada
 */
router.get('/:id', authMiddleware.authenticate, authMiddleware.profissionaisOnly, ControleEstoqueController.findById);

/**
 * @swagger
 * /api/controle-estoque:
 *   post:
 *     tags:
 *       - Controle de Estoque
 *     summary: Criar solicitação de medicamento
 *     description: Cria uma nova solicitação de medicamento (apenas Médicos e Admins)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - medicamento_id
 *               - quantidade
 *               - data_validade
 *               - lote
 *             properties:
 *               medicamento_id:
 *                 type: string
 *                 format: uuid
 *                 description: ID do medicamento
 *               quantidade:
 *                 type: integer
 *                 description: Quantidade solicitada
 *               data_validade:
 *                 type: string
 *                 format: date
 *                 description: Data de validade
 *               lote:
 *                 type: string
 *                 description: Número do lote
 *     responses:
 *       201:
 *         description: Solicitação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Estoque'
 *       401:
 *         description: Acesso negado
 *       403:
 *         description: Apenas Médicos e Admins
 */
router.post('/', authMiddleware.authenticate, authMiddleware.medicoOnly, ControleEstoqueController.create);

/**
 * @route   PUT /controle-estoque/:id
 * @desc    Atualiza uma solicitação existente
 * @access  Private - Médicos e Admins
 */
router.put('/:id', authMiddleware.authenticate, authMiddleware.medicoOnly, ControleEstoqueController.update);

/**
 * @route   DELETE /controle-estoque/:id
 * @desc    Remove uma solicitação
 * @access  Private - Apenas Admins
 */
router.delete('/:id', authMiddleware.authenticate, authMiddleware.adminOnly, ControleEstoqueController.delete);

/**
 * @route   PATCH /controle-estoque/:id/status
 * @desc    Atualiza o status de uma solicitação
 * @access  Private - Farmacêuticos e Admins
 */
router.patch('/:id/status', authMiddleware.authenticate, authMiddleware.farmaceuticoOnly, ControleEstoqueController.atualizarStatus);

/**
 * @route   GET /controle-estoque/medico/:medicoId
 * @desc    Busca solicitações por médico
 * @access  Public
 */
router.get('/medico/:medicoId', ControleEstoqueController.findByMedico);

/**
 * @route   GET /controle-estoque/paciente/:pacienteId
 * @desc    Busca solicitações por paciente
 * @access  Public
 */
router.get('/paciente/:pacienteId', ControleEstoqueController.findByPaciente);

/**
 * @route   GET /controle-estoque/status
 * @desc    Busca solicitações por status
 * @access  Public
 */
router.get('/busca/status', ControleEstoqueController.findByStatus);

/**
 * @route   GET /controle-estoque/relatorio
 * @desc    Gera relatório de solicitações por período
 * @access  Public
 */
router.get('/relatorio', ControleEstoqueController.relatorio);

export default router; 