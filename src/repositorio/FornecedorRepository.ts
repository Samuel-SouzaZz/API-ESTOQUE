import { IBaseRepository } from './BaseRepository';
import Fornecedor, { IFornecedor } from '../models/Fornecedor';
import { StatusFornecedor } from '../models/enums/statusFornecedor';
import { db } from '../config/database';

/**
 * Repositório para gerenciamento de Fornecedores
 * Conectado ao banco SQLite via Knex.js
 */
export class FornecedorRepository implements IBaseRepository<IFornecedor> {

  /**
   * Busca todos os fornecedores cadastrados
   * @returns Promise com lista de fornecedores
   */
  async findAll(): Promise<IFornecedor[]> {
    const fornecedores = await db('fornecedores').select('*');
    return fornecedores.map(f => new Fornecedor({
      id: f.id.toString(),
      nome: f.nome,
      status: f.status,
      telefone: f.telefone,
      createdAt: f.created_at,
      updatedAt: f.updated_at
    }));
  }

  /**
   * Busca um fornecedor pelo ID
   * @param id ID do fornecedor
   * @returns Promise com o fornecedor encontrado ou null
   */
  async findById(id: string): Promise<IFornecedor | null> {
    const fornecedor = await db('fornecedores').where('id', id).first();
    
    if (!fornecedor) {
      return null;
    }
    
    return new Fornecedor({
      id: fornecedor.id.toString(),
      nome: fornecedor.nome,
      status: fornecedor.status,
      telefone: fornecedor.telefone,
      createdAt: fornecedor.created_at,
      updatedAt: fornecedor.updated_at
    });
  }

  /**
   * Cria um novo fornecedor
   * @param data Dados do fornecedor
   * @returns Promise com o fornecedor criado
   */
  async create(data: Partial<IFornecedor>): Promise<IFornecedor> {
    const [id] = await db('fornecedores').insert({
      nome: data.nome,
      status: data.status || StatusFornecedor.Disponivel,
      telefone: data.telefone,
      created_at: new Date(),
      updated_at: new Date()
    });
    
    const fornecedorCriado = await this.findById(id.toString());
    return fornecedorCriado!;
  }

  /**
   * Atualiza um fornecedor existente
   * @param id ID do fornecedor
   * @param data Dados para atualização
   * @returns Promise com o fornecedor atualizado ou null
   */
  async update(id: string, data: Partial<IFornecedor>): Promise<IFornecedor | null> {
    const updated = await db('fornecedores')
      .where('id', id)
      .update({
        nome: data.nome,
        status: data.status,
        telefone: data.telefone,
        updated_at: new Date()
      });
    
    if (updated === 0) {
      return null;
    }
    
    return this.findById(id);
  }

  /**
   * Remove um fornecedor
   * @param id ID do fornecedor
   * @returns Promise com boolean indicando sucesso
   */
  async delete(id: string): Promise<boolean> {
    const deleted = await db('fornecedores').where('id', id).del();
    return deleted > 0;
  }

  /**
   * Busca fornecedores por nome
   * @param nome Nome ou parte do nome do fornecedor
   * @returns Promise com lista de fornecedores que correspondem ao critério
   */
  async findByNome(nome: string): Promise<IFornecedor[]> {
    const fornecedores = await db('fornecedores')
      .where('nome', 'like', `%${nome}%`)
      .select('*');
    
    return fornecedores.map(f => new Fornecedor({
      id: f.id.toString(),
      nome: f.nome,
      status: f.status,
      telefone: f.telefone,
      createdAt: f.created_at,
      updatedAt: f.updated_at
    }));
  }

  /**
   * Busca fornecedores por status
   * @param status Status a ser filtrado
   * @returns Promise com lista de fornecedores com o status especificado
   */
  async findByStatus(status: string): Promise<IFornecedor[]> {
    const fornecedores = await db('fornecedores')
      .where('status', status)
      .select('*');
    
    return fornecedores.map(f => new Fornecedor({
      id: f.id.toString(),
      nome: f.nome,
      status: f.status,
      telefone: f.telefone,
      createdAt: f.created_at,
      updatedAt: f.updated_at
    }));
  }

  /**
   * Atualiza o status de um fornecedor
   * @param id ID do fornecedor
   * @param status Novo status
   * @returns Promise com o fornecedor atualizado ou null
   */
  async atualizarStatus(id: string, status: string): Promise<IFornecedor | null> {
    return this.update(id, { status });
  }
} 