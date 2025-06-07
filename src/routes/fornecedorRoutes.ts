import express from 'express';
import { FornecedorController } from '../controllers/FornecedorController';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
const authMiddleware = new AuthMiddleware();

/**
 * @route   GET /api/fornecedores
 * @desc    Obtém todos os fornecedores
 * @access  Public
 */
router.get('/', FornecedorController.findAll);

/**
 * @route   GET /api/fornecedores/:id
 * @desc    Obtém um fornecedor pelo ID
 * @access  Public
 */
router.get('/:id', FornecedorController.findById);

/**
 * @route   POST /api/fornecedores
 * @desc    Cria um novo fornecedor
 * @access  Private - Farmacêuticos e Admins
 */
router.post('/', authMiddleware.authenticate, authMiddleware.farmaceuticoOnly, FornecedorController.create);

/**
 * @route   PUT /api/fornecedores/:id
 * @desc    Atualiza um fornecedor existente
 * @access  Private - Farmacêuticos e Admins
 */
router.put('/:id', authMiddleware.authenticate, authMiddleware.farmaceuticoOnly, FornecedorController.update);

/**
 * @route   DELETE /api/fornecedores/:id
 * @desc    Remove um fornecedor
 * @access  Private - Apenas Admins
 */
router.delete('/:id', authMiddleware.authenticate, authMiddleware.adminOnly, FornecedorController.delete);

/**
 * @route   GET /api/fornecedores/busca/nome
 * @desc    Busca fornecedores por nome
 * @access  Public
 */
router.get('/busca/nome', FornecedorController.findByNome);

/**
 * @route   GET /api/fornecedores/status/:status
 * @desc    Busca fornecedores por status
 * @access  Public
 */
router.get('/status/:status', FornecedorController.findByStatus);

export default router; 