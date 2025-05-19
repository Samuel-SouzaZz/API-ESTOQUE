import express from 'express';
import { FornecedorController } from '../controllers/FornecedorController';

const router = express.Router();

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
 * @access  Public
 */
router.post('/', FornecedorController.create);

/**
 * @route   PUT /api/fornecedores/:id
 * @desc    Atualiza um fornecedor existente
 * @access  Public
 */
router.put('/:id', FornecedorController.update);

/**
 * @route   DELETE /api/fornecedores/:id
 * @desc    Remove um fornecedor
 * @access  Public
 */
router.delete('/:id', FornecedorController.delete);

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