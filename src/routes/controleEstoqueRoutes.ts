import { Router } from 'express';
import { ControleEstoqueController } from '../controllers';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = Router();
const authMiddleware = new AuthMiddleware();

/**
 * @route   GET /controle-estoque
 * @desc    Busca todas as solicitações de medicamentos
 * @access  Private - Profissionais de saúde
 */
router.get('/', authMiddleware.authenticate, authMiddleware.profissionaisOnly, ControleEstoqueController.findAll);

/**
 * @route   GET /controle-estoque/:id
 * @desc    Busca uma solicitação pelo ID
 * @access  Private - Profissionais de saúde
 */
router.get('/:id', authMiddleware.authenticate, authMiddleware.profissionaisOnly, ControleEstoqueController.findById);

/**
 * @route   POST /controle-estoque
 * @desc    Cria uma nova solicitação de medicamento
 * @access  Private - Médicos e Admins
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