import { Router } from 'express';
import { MedicamentoController } from '../controllers';

const router = Router();

/**
 * @route   GET /medicamentos
 * @desc    Busca todos os medicamentos
 * @access  Public
 */
router.get('/', MedicamentoController.findAll);

/**
 * @route   GET /medicamentos/:id
 * @desc    Busca um medicamento pelo ID
 * @access  Public
 */
router.get('/:id', MedicamentoController.findById);

/**
 * @route   POST /medicamentos
 * @desc    Cria um novo medicamento
 * @access  Public
 */
router.post('/', MedicamentoController.create);

/**
 * @route   PUT /medicamentos/:id
 * @desc    Atualiza um medicamento existente
 * @access  Public
 */
router.put('/:id', MedicamentoController.update);

/**
 * @route   DELETE /medicamentos/:id
 * @desc    Remove um medicamento
 * @access  Public
 */
router.delete('/:id', MedicamentoController.delete);

/**
 * @route   GET /medicamentos/busca/nome
 * @desc    Busca medicamentos por nome
 * @access  Public
 */
router.get('/busca/nome', MedicamentoController.findByNome);

/**
 * @route   GET /medicamentos/fornecedor/:fornecedorId
 * @desc    Busca medicamentos por fornecedor
 * @access  Public
 */
router.get('/fornecedor/:fornecedorId', MedicamentoController.findByFornecedor);

export default router; 