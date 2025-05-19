import express from 'express';
import { PacienteController } from '../controllers/PacienteController';

const router = express.Router();

/**
 * @route   GET /api/pacientes
 * @desc    Obtém todos os pacientes
 * @access  Public
 */
router.get('/', PacienteController.findAll);

/**
 * @route   GET /api/pacientes/:id
 * @desc    Obtém um paciente pelo ID
 * @access  Public
 */
router.get('/:id', PacienteController.findById);

/**
 * @route   POST /api/pacientes
 * @desc    Cria um novo paciente
 * @access  Public
 */
router.post('/', PacienteController.create);

/**
 * @route   PUT /api/pacientes/:id
 * @desc    Atualiza um paciente existente
 * @access  Public
 */
router.put('/:id', PacienteController.update);

/**
 * @route   DELETE /api/pacientes/:id
 * @desc    Remove um paciente
 * @access  Public
 */
router.delete('/:id', PacienteController.delete);

/**
 * @route   GET /api/pacientes/busca/nome
 * @desc    Busca pacientes por nome
 * @access  Public
 */
router.get('/busca/nome', PacienteController.findByNome);

export default router; 