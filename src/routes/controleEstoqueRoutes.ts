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

// Rotas específicas devem vir ANTES das rotas com parâmetros dinâmicos
/**
 * @swagger
 * /api/controle-estoque/busca/status:
 *   get:
 *     tags:
 *       - Controle de Estoque
 *     summary: Buscar solicitações por status
 *     description: Retorna todas as solicitações com status específico
 *     parameters:
 *       - in: query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [PENDENTE, APROVADO, REJEITADO, ENTREGUE]
 *         description: Status das solicitações
 *         example: "PENDENTE"
 *     responses:
 *       200:
 *         description: Solicitações com o status especificado
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
 *       404:
 *         description: Nenhuma solicitação encontrada com este status
 */
router.get('/busca/status', ControleEstoqueController.findByStatus);

/**
 * @swagger
 * /api/controle-estoque/medico/{medicoId}:
 *   get:
 *     tags:
 *       - Controle de Estoque
 *     summary: Buscar solicitações por médico
 *     description: Retorna todas as solicitações de um médico específico
 *     parameters:
 *       - in: path
 *         name: medicoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do médico
 *         example: "3"
 *     responses:
 *       200:
 *         description: Solicitações do médico encontradas
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
 *       404:
 *         description: Nenhuma solicitação encontrada para este médico
 */
router.get('/medico/:medicoId', ControleEstoqueController.findByMedico);

/**
 * @swagger
 * /api/controle-estoque/paciente/{pacienteId}:
 *   get:
 *     tags:
 *       - Controle de Estoque
 *     summary: Buscar solicitações por paciente
 *     description: Retorna todas as solicitações de um paciente específico
 *     parameters:
 *       - in: path
 *         name: pacienteId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do paciente
 *         example: "2"
 *     responses:
 *       200:
 *         description: Solicitações do paciente encontradas
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
 *       404:
 *         description: Nenhuma solicitação encontrada para este paciente
 */
router.get('/paciente/:pacienteId', ControleEstoqueController.findByPaciente);

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
 *         description: ID da solicitação
 *         example: "1"
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
 * @route   GET /controle-estoque/relatorio
 * @desc    Gera relatório de solicitações por período
 * @access  Public
 */
router.get('/relatorio', ControleEstoqueController.relatorio);

export default router; 