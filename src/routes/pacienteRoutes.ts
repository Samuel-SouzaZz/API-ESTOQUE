import express from 'express';
import { PacienteController } from '../controllers/PacienteController';
import { AuthMiddleware } from '../middleware/authMiddleware';

const router = express.Router();
const authMiddleware = new AuthMiddleware();

/**
 * @swagger
 * /api/pacientes:
 *   get:
 *     tags:
 *       - Pacientes
 *     summary: Listar todos os pacientes
 *     description: Busca todos os pacientes cadastrados (apenas profissionais de saúde)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Itens por página
 *     responses:
 *       200:
 *         description: Lista de pacientes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                       nome:
 *                         type: string
 *                       cpf:
 *                         type: string
 *                       data_nascimento:
 *                         type: string
 *                         format: date
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       updated_at:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Acesso negado
 *       403:
 *         description: Apenas profissionais de saúde
 */
router.get('/', authMiddleware.authenticate, authMiddleware.profissionaisOnly, PacienteController.findAll);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   get:
 *     tags:
 *       - Pacientes
 *     summary: Buscar paciente por ID
 *     description: Retorna um paciente específico pelo ID (apenas profissionais de saúde)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Paciente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     nome:
 *                       type: string
 *                     cpf:
 *                       type: string
 *                     data_nascimento:
 *                       type: string
 *                       format: date
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                     updated_at:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Acesso negado
 *       403:
 *         description: Apenas profissionais de saúde
 *       404:
 *         description: Paciente não encontrado
 */
router.get('/:id', authMiddleware.authenticate, authMiddleware.profissionaisOnly, PacienteController.findById);

/**
 * @swagger
 * /api/pacientes:
 *   post:
 *     tags:
 *       - Pacientes
 *     summary: Cadastrar novo paciente
 *     description: Cria um novo paciente (apenas Médicos e Admins)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - cpf
 *               - data_nascimento
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome completo do paciente
 *                 example: "João da Silva Santos"
 *               cpf:
 *                 type: string
 *                 description: CPF do paciente
 *                 example: "123.456.789-00"
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento
 *                 example: "1990-01-15"
 *     responses:
 *       201:
 *         description: Paciente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     nome:
 *                       type: string
 *                     cpf:
 *                       type: string
 *                     data_nascimento:
 *                       type: string
 *                       format: date
 *       401:
 *         description: Acesso negado
 *       403:
 *         description: Permissão insuficiente (apenas Médicos e Admins)
 *       409:
 *         description: CPF já cadastrado
 */
router.post('/', authMiddleware.authenticate, authMiddleware.medicoOnly, PacienteController.create);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   put:
 *     tags:
 *       - Pacientes
 *     summary: Atualizar paciente
 *     description: Atualiza um paciente existente (apenas Médicos e Admins)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do paciente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome completo do paciente
 *               cpf:
 *                 type: string
 *                 description: CPF do paciente
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 description: Data de nascimento
 *     responses:
 *       200:
 *         description: Paciente atualizado com sucesso
 *       401:
 *         description: Acesso negado
 *       403:
 *         description: Permissão insuficiente
 *       404:
 *         description: Paciente não encontrado
 *       409:
 *         description: CPF já em uso por outro paciente
 */
router.put('/:id', authMiddleware.authenticate, authMiddleware.medicoOnly, PacienteController.update);

/**
 * @swagger
 * /api/pacientes/{id}:
 *   delete:
 *     tags:
 *       - Pacientes
 *     summary: Remover paciente
 *     description: Remove um paciente do sistema (apenas Admins)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID do paciente
 *     responses:
 *       200:
 *         description: Paciente removido com sucesso
 *       401:
 *         description: Acesso negado
 *       403:
 *         description: Permissão insuficiente (apenas Admins)
 *       404:
 *         description: Paciente não encontrado
 */
router.delete('/:id', authMiddleware.authenticate, authMiddleware.adminOnly, PacienteController.delete);

/**
 * @swagger
 * /api/pacientes/busca/nome:
 *   get:
 *     tags:
 *       - Pacientes
 *     summary: Buscar pacientes por nome
 *     description: Busca pacientes que contenham o termo no nome
 *     parameters:
 *       - in: query
 *         name: nome
 *         required: true
 *         schema:
 *           type: string
 *         description: Nome ou parte do nome do paciente
 *         example: "João"
 *     responses:
 *       200:
 *         description: Pacientes encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       nome:
 *                         type: string
 *                       cpf:
 *                         type: string
 *                       data_nascimento:
 *                         type: string
 *                         format: date
 */
router.get('/busca/nome', PacienteController.findByNome);

export default router; 