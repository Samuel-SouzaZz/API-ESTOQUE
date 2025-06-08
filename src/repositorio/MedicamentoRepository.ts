import { IBaseRepository } from './BaseRepository';
import Medicamento, { IMedicamento } from '../models/Medicamento';
import { db } from '../config/database';

/**
 * Repositório para gerenciamento de Medicamentos
 * Conectado ao banco SQLite via Knex.js
 */
export class MedicamentoRepository implements IBaseRepository<IMedicamento> {

  /**
   * Busca todos os medicamentos cadastrados
   * @returns Promise com lista de medicamentos
   */
  async findAll(): Promise<IMedicamento[]> {
    const medicamentos = await db('medicamentos').select('*');
    return medicamentos.map(m => new Medicamento({
      id: m.id.toString(),
      nome: m.nome,
      fornecedorId: m.fornecedor_id?.toString() || '',
      tarja: 'SEM_TARJA',
      createdAt: m.created_at,
      updatedAt: m.updated_at
    }));
  }

  /**
   * Busca um medicamento pelo ID
   * @param id ID do medicamento
   * @returns Promise com o medicamento encontrado ou null
   */
  async findById(id: string): Promise<IMedicamento | null> {
    const medicamento = await db('medicamentos').where('id', id).first();
    
    if (!medicamento) {
      return null;
    }
    
    return new Medicamento({
      id: medicamento.id.toString(),
      nome: medicamento.nome,
      fornecedorId: medicamento.fornecedor_id?.toString() || '',
      tarja: 'SEM_TARJA',
      createdAt: medicamento.created_at,
      updatedAt: medicamento.updated_at
    });
  }

  /**
   * Cria um novo medicamento
   * @param data Dados do medicamento
   * @returns Promise com o medicamento criado
   */
  async create(data: Partial<IMedicamento>): Promise<IMedicamento> {
    const [id] = await db('medicamentos').insert({
      nome: data.nome,
      descricao: 'Medicamento',
      fornecedor_id: data.fornecedorId ? parseInt(data.fornecedorId) : undefined,
      created_at: new Date(),
      updated_at: new Date()
    });
    
    const medicamentoCriado = await this.findById(id.toString());
    return medicamentoCriado!;
  }

  /**
   * Atualiza um medicamento existente
   * @param id ID do medicamento
   * @param data Dados para atualização
   * @returns Promise com o medicamento atualizado ou null
   */
  async update(id: string, data: Partial<IMedicamento>): Promise<IMedicamento | null> {
    const updated = await db('medicamentos')
      .where('id', id)
      .update({
        nome: data.nome,
        fornecedor_id: data.fornecedorId ? parseInt(data.fornecedorId) : undefined,
        updated_at: new Date()
      });
    
    if (updated === 0) {
      return null;
    }
    
    return this.findById(id);
  }

  /**
   * Remove um medicamento
   * @param id ID do medicamento
   * @returns Promise com boolean indicando sucesso
   */
  async delete(id: string): Promise<boolean> {
    const deleted = await db('medicamentos').where('id', id).del();
    return deleted > 0;
  }

  /**
   * Busca medicamentos por nome (método específico)
   * @param nome Nome ou parte do nome do medicamento
   * @returns Promise com lista de medicamentos que correspondem ao critério
   */
  async findByNome(nome: string): Promise<IMedicamento[]> {
    const medicamentos = await db('medicamentos')
      .where('nome', 'like', `%${nome}%`)
      .select('*');
    
    return medicamentos.map(m => new Medicamento({
      id: m.id.toString(),
      nome: m.nome,
      fornecedorId: m.fornecedor_id?.toString() || '',
      tarja: 'SEM_TARJA',
      createdAt: m.created_at,
      updatedAt: m.updated_at
    }));
  }

  /**
   * Busca medicamentos por fornecedor (método específico)
   * @param fornecedorId ID do fornecedor
   * @returns Promise com lista de medicamentos do fornecedor
   */
  async findByFornecedor(fornecedorId: string): Promise<IMedicamento[]> {
    const medicamentos = await db('medicamentos')
      .where('fornecedor_id', fornecedorId)
      .select('*');
    
    return medicamentos.map(m => new Medicamento({
      id: m.id.toString(),
      nome: m.nome,
      fornecedorId: m.fornecedor_id?.toString() || '',
      tarja: 'SEM_TARJA',
      createdAt: m.created_at,
      updatedAt: m.updated_at
    }));
  }
} 