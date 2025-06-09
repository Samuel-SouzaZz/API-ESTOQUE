import { Router } from 'express';
import { LoteController } from '../controllers';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = Router();
const authMiddleware = new AuthMiddleware();

/**
 * @route   GET /lotes
 * @desc    Busca todos os lotes
 * @access  Private - Profissionais de saúde
 */
router.get('/', authMiddleware.authenticate, authMiddleware.profissionaisOnly, LoteController.findAll);

/**
 * @route   GET /lotes/:id
 * @desc    Busca um lote pelo ID
 * @access  Private - Profissionais de saúde
 */
router.get('/:id', authMiddleware.authenticate, authMiddleware.profissionaisOnly, LoteController.findById);

/**
 * @route   POST /lotes
 * @desc    Cria um novo lote
 * @access  Private - Farmacêuticos e Admins
 */
router.post('/', authMiddleware.authenticate, authMiddleware.farmaceuticoOnly, LoteController.create);

/**
 * @route   PUT /lotes/:id
 * @desc    Atualiza um lote existente
 * @access  Private - Farmacêuticos e Admins
 */
router.put('/:id', authMiddleware.authenticate, authMiddleware.farmaceuticoOnly, LoteController.update);

/**
 * @route   DELETE /lotes/:id
 * @desc    Remove um lote
 * @access  Private - Apenas Admins
 */
router.delete('/:id', authMiddleware.authenticate, authMiddleware.adminOnly, LoteController.delete);

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