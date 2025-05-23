import express from 'express';
import medicamentoRoutes from './medicamentoRoutes';
import controleEstoqueRoutes from './controleEstoqueRoutes';
import loteRoutes from './loteRoutes';
import fornecedorRoutes from './fornecedorRoutes';
import pacienteRoutes from './pacienteRoutes';
import authRoutes from './authRoutes';
import protectedExamples from './protectedExamples';

const router = express.Router();

// Rotas de autenticação
router.use('/auth', authRoutes);

// Rotas de exemplos protegidos
router.use('/protected', protectedExamples);

// Rotas de medicamentos
router.use('/medicamentos', medicamentoRoutes);

// Rotas de controle de estoque
router.use('/controle-estoque', controleEstoqueRoutes);

// Rotas de lotes
router.use('/lotes', loteRoutes);

// Rotas de fornecedores
router.use('/fornecedores', fornecedorRoutes);

// Rotas de pacientes
router.use('/pacientes', pacienteRoutes);

export default router; 