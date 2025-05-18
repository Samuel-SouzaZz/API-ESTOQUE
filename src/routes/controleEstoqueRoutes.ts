import { Router } from 'express';
import { ControleEstoqueController } from '../controllers';

const router = Router();

/**
 * @route   GET /controle-estoque
 * @desc    Busca todas as solicitações de medicamentos
 * @access  Public
 */
router.get('/', ControleEstoqueController.findAll);

/**
 * @route   GET /controle-estoque/:id
 * @desc    Busca uma solicitação pelo ID
 * @access  Public
 */
router.get('/:id', ControleEstoqueController.findById);

/**
 * @route   POST /controle-estoque
 * @desc    Cria uma nova solicitação de medicamento
 * @access  Public
 */
router.post('/', ControleEstoqueController.create);

/**
 * @route   PUT /controle-estoque/:id
 * @desc    Atualiza uma solicitação existente
 * @access  Public
 */
router.put('/:id', ControleEstoqueController.update);

/**
 * @route   DELETE /controle-estoque/:id
 * @desc    Remove uma solicitação
 * @access  Public
 */
router.delete('/:id', ControleEstoqueController.delete);

/**
 * @route   PATCH /controle-estoque/:id/status
 * @desc    Atualiza o status de uma solicitação
 * @access  Public
 */
router.patch('/:id/status', ControleEstoqueController.atualizarStatus);

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