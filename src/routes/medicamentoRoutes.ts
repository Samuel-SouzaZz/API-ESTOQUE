import { Router } from 'express';
import { MedicamentoController } from '../controllers';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = Router();
const authMiddleware = new AuthMiddleware();

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
 * @access  Private - Farmacêuticos e Admins
 */
router.post('/', authMiddleware.authenticate, authMiddleware.farmaceuticoOnly, MedicamentoController.create);

/**
 * @route   PUT /medicamentos/:id
 * @desc    Atualiza um medicamento existente
 * @access  Private - Farmacêuticos e Admins
 */
router.put('/:id', authMiddleware.authenticate, authMiddleware.farmaceuticoOnly, MedicamentoController.update);

/**
 * @route   DELETE /medicamentos/:id
 * @desc    Remove um medicamento
 * @access  Private - Apenas Admins
 */
router.delete('/:id', authMiddleware.authenticate, authMiddleware.adminOnly, MedicamentoController.delete);

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