import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Estoque de Medicamentos',
      version: '1.0.0',
      description: 'API para gerenciamento de estoque de medicamentos - Projeto Final Back-end I',
      contact: {
        name: 'Professor Thiago Goldoni Thomé',
        email: 'thiago.thome@exemplo.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do usuário'
            },
            nome: {
              type: 'string',
              description: 'Nome completo do usuário'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário'
            },
            role: {
              type: 'string',
              enum: ['ADMIN', 'MEDICO', 'FARMACEUTICO', 'PACIENTE'],
              description: 'Papel do usuário no sistema'
            },
            telefone: {
              type: 'string',
              description: 'Telefone do usuário'
            },
            endereco: {
              type: 'string',
              description: 'Endereço do usuário'
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            },
            updated_at: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'senha'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Email do usuário'
            },
            senha: {
              type: 'string',
              description: 'Senha do usuário'
            }
          }
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'Token JWT de autenticação'
            },
            usuario: {
              $ref: '#/components/schemas/Usuario'
            }
          }
        },
        Medicamento: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do medicamento'
            },
            nome: {
              type: 'string',
              description: 'Nome do medicamento'
            },
            descricao: {
              type: 'string',
              description: 'Descrição do medicamento'
            },
            fabricante: {
              type: 'string',
              description: 'Fabricante do medicamento'
            },
            preco: {
              type: 'number',
              format: 'decimal',
              description: 'Preço unitário'
            },
            categoria_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID da categoria'
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            },
            updated_at: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Categoria: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único da categoria'
            },
            nome: {
              type: 'string',
              description: 'Nome da categoria'
            },
            descricao: {
              type: 'string',
              description: 'Descrição da categoria'
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            },
            updated_at: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Estoque: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do estoque'
            },
            medicamento_id: {
              type: 'string',
              format: 'uuid',
              description: 'ID do medicamento'
            },
            quantidade: {
              type: 'integer',
              description: 'Quantidade em estoque'
            },
            data_validade: {
              type: 'string',
              format: 'date',
              description: 'Data de validade'
            },
            lote: {
              type: 'string',
              description: 'Número do lote'
            },
            created_at: {
              type: 'string',
              format: 'date-time'
            },
            updated_at: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro'
            },
            status: {
              type: 'integer',
              description: 'Código de status HTTP'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./src/routes/*.ts'], // Caminho para os arquivos com anotações Swagger
};

const specs = swaggerJSDoc(options);

export { swaggerUi, specs }; 