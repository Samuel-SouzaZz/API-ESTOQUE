import { Router } from 'express';
import { LoteController } from '../controllers';

const router = Router();

/**
 * @route   GET /lotes
 * @desc    Busca todos os lotes
 * @access  Public
 */
router.get('/', LoteController.findAll);

/**
 * @route   GET /lotes/:id
 * @desc    Busca um lote pelo ID
 * @access  Public
 */
router.get('/:id', LoteController.findById);

/**
 * @route   POST /lotes
 * @desc    Cria um novo lote
 * @access  Public
 */
router.post('/', LoteController.create);

/**
 * @route   PUT /lotes/:id
 * @desc    Atualiza um lote existente
 * @access  Public
 */
router.put('/:id', LoteController.update);

/**
 * @route   DELETE /lotes/:id
 * @desc    Remove um lote
 * @access  Public
 */
router.delete('/:id', LoteController.delete);

/**
 * @route   GET /lotes/produto/:produtoId
 * @desc    Busca lotes por produto
 * @access  Public
 */
router.get('/produto/:produtoId', LoteController.findByProduto);

/**
 * @route   GET /lotes/vencidos
 * @desc    Busca lotes vencidos
 * @access  Public
 */
router.get('/busca/vencidos', LoteController.findLotesVencidos);

/**
 * @route   GET /lotes/proximos-vencimento
 * @desc    Busca lotes próximos do vencimento
 * @access  Public
 */
router.get('/busca/proximos-vencimento', LoteController.findLotesProximosVencimento);

/**
 * @route   GET /lotes/:id/verificar-vencimento
 * @desc    Verifica se um lote está vencido
 * @access  Public
 */
router.get('/:id/verificar-vencimento', LoteController.verificarVencimento);

export default router; 