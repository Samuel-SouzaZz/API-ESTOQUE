import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { swaggerUi, specs } from './config/swagger';

// Carrega as variáveis de ambiente
dotenv.config();

// Inicializa o app Express
const app = express();

// Middleware CORS configurado
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', 'http://127.0.0.1:5000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas base da API
app.get('/', (req: express.Request, res: express.Response) => {
  res.send('API de Controle de Estoque de Medicamentos está funcionando!');
});

// Incorpora todas as rotas da API
app.use('/api', routes);

// Porta da aplicação
const PORT = process.env.PORT || 5000;

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`API de Controle de Estoque de Medicamentos iniciada em http://localhost:${PORT}`);
  console.log(`📚 Documentação Swagger disponível em: http://localhost:${PORT}/api-docs`);
});

export default app; 