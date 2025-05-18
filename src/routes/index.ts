import express from 'express';
import medicamentoRoutes from './medicamentoRoutes';
import controleEstoqueRoutes from './controleEstoqueRoutes';
import loteRoutes from './loteRoutes';

const router = express.Router();

// Rotas de medicamentos
router.use('/medicamentos', medicamentoRoutes);

// Rotas de controle de estoque
router.use('/controle-estoque', controleEstoqueRoutes);

// Rotas de lotes
router.use('/lotes', loteRoutes);

export default router; 