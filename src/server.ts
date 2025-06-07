import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';

// Carrega as variáveis de ambiente
dotenv.config();

// Inicializa o app Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
});

export default app; 