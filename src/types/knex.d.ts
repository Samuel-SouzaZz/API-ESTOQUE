// Esta declaração de módulo estende os tipos existentes do Knex
import type { Knex } from 'knex';

// Aqui você pode definir tipos personalizados para suas tabelas se necessário
declare module 'knex/types/tables' {
  interface Tables {
    fornecedores: {
      id: number;
      nome: string;
      status: string;
      telefone: string;
      created_at: Date;
      updated_at: Date;
    };
    
    farmacia_popular: {
      id: number;
      nome: string;
      endereco: string;
      created_at: Date;
      updated_at: Date;
    };
    
    medicos: {
      id: number;
      nome: string;
      crm: string;
      especialidade: string;
      created_at: Date;
      updated_at: Date;
    };
    
    pacientes: {
      id: number;
      nome: string;
      cpf: string;
      data_nascimento: Date;
      created_at: Date;
      updated_at: Date;
    };
    
    medicamentos: {
      id: number;
      nome: string;
      descricao: string;
      fornecedor_id: number;
      created_at: Date;
      updated_at: Date;
    };
    
    farmaceuticos: {
      id: number;
      nome: string;
      crf: string;
      created_at: Date;
      updated_at: Date;
    };
    
    lotes: {
      id: number;
      numero_lote: string;
      medicamento_id: number;
      quantidade: number;
      data_fabricacao: Date;
      data_validade: Date;
      preco_unitario: number;
      status: string;
      created_at: Date;
      updated_at: Date;
    };
    
    estoque: {
      id: number;
      medicamento_id: number;
      lote_id: number;
      quantidade_disponivel: number;
      quantidade_minima: number;
      localizacao: string;
      created_at: Date;
      updated_at: Date;
    };
    
    controle_estoque: {
      id: number;
      estoque_id: number;
      medicamento_id: number;
      lote_id: number;
      tipo_movimento: string;
      quantidade: number;
      usuario_id: number;
      paciente_id: number;
      medico_id: number;
      data_movimento: Date;
      observacao: string;
      created_at: Date;
      updated_at: Date;
    };
    
    usuarios: {
      id: number;
      nome: string;
      email: string;
      senha: string;
      role: string;
      created_at: Date;
      updated_at: Date;
    };
  }
} 