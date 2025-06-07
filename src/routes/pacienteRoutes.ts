import express from 'express';
import { PacienteController } from '../controllers/PacienteController';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
const authMiddleware = new AuthMiddleware();

/**
 * @route   GET /api/pacientes
 * @desc    Obtém todos os pacientes
 * @access  Private - Profissionais de saúde
 */
router.get('/', authMiddleware.authenticate, authMiddleware.profissionaisOnly, PacienteController.findAll);

/**
 * @route   GET /api/pacientes/:id
 * @desc    Obtém um paciente pelo ID
 * @access  Private - Profissionais de saúde
 */
router.get('/:id', authMiddleware.authenticate, authMiddleware.profissionaisOnly, PacienteController.findById);

/**
 * @route   POST /api/pacientes
 * @desc    Cria um novo paciente
 * @access  Private - Médicos e Admins
 */
router.post('/', authMiddleware.authenticate, authMiddleware.medicoOnly, PacienteController.create);

/**
 * @route   PUT /api/pacientes/:id
 * @desc    Atualiza um paciente existente
 * @access  Private - Médicos e Admins
 */
router.put('/:id', authMiddleware.authenticate, authMiddleware.medicoOnly, PacienteController.update);

/**
 * @route   DELETE /api/pacientes/:id
 * @desc    Remove um paciente
 * @access  Private - Apenas Admins
 */
router.delete('/:id', authMiddleware.authenticate, authMiddleware.adminOnly, PacienteController.delete);

/**
 * @route   GET /api/pacientes/busca/nome
 * @desc    Busca pacientes por nome
 * @access  Public
 */
router.get('/busca/nome', PacienteController.findByNome);

export default router; 