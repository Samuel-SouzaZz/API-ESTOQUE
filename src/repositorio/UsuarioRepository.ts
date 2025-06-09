import { IBaseRepository } from './BaseRepository';
import { IUsuario } from '../models/Usuario';
import { UserRole } from '../models/enums/UserRole';
import { db } from '../config/database';

/**
 * Repositório para gerenciamento de Usuários
 * Conectado ao banco SQLite via Knex.js
 */
export class UsuarioRepository implements IBaseRepository<IUsuario> {

  /**
   * Busca todos os usuários
   * @returns Promise com lista de usuários
   */
  async findAll(): Promise<IUsuario[]> {
    const usuarios = await db('usuarios').select('*');
    return usuarios.map(u => ({
      id: u.id.toString(),
      nome: u.nome,
      email: u.email,
      senha: u.senha,
      role: u.role as UserRole,
      createdAt: u.created_at,
      updatedAt: u.updated_at
    }));
  }

  /**
   * Busca usuário por ID
   * @param id ID do usuário
   * @returns Promise com o usuário encontrado ou null
   */
  async findById(id: string): Promise<IUsuario | null> {
    const usuario = await db('usuarios').where('id', id).first();
    
    if (!usuario) {
      return null;
    }
    
    return {
      id: usuario.id.toString(),
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      role: usuario.role as UserRole,
      createdAt: usuario.created_at,
      updatedAt: usuario.updated_at
    };
  }

  /**
   * Busca usuário por email
   * @param email Email do usuário
   * @returns Promise com o usuário encontrado ou null
   */
  async findByEmail(email: string): Promise<IUsuario | null> {
    const usuario = await db('usuarios').where('email', email).first();
    
    if (!usuario) {
      return null;
    }
    
    return {
      id: usuario.id.toString(),
      nome: usuario.nome,
      email: usuario.email,
      senha: usuario.senha,
      role: usuario.role as UserRole,
      createdAt: usuario.created_at,
      updatedAt: usuario.updated_at
    };
  }

  /**
   * Cria um novo usuário
   * @param userData Dados do usuário
   * @returns Promise com o usuário criado
   */
  async create(userData: Partial<IUsuario>): Promise<IUsuario> {
    const [id] = await db('usuarios').insert({
      nome: userData.nome,
      email: userData.email,
      senha: userData.senha,
      role: userData.role || UserRole.PACIENTE,
      created_at: new Date(),
      updated_at: new Date()
    });
    
    const usuarioCriado = await this.findById(id.toString());
    return usuarioCriado!;
  }

  /**
   * Atualiza um usuário
   * @param id ID do usuário
   * @param userData Dados para atualização
   * @returns Promise com o usuário atualizado ou null
   */
  async update(id: string, userData: Partial<IUsuario>): Promise<IUsuario | null> {
    const updated = await db('usuarios')
      .where('id', id)
      .update({
        nome: userData.nome,
        email: userData.email,
        senha: userData.senha,
        role: userData.role,
        updated_at: new Date()
      });
    
    if (updated === 0) {
      return null;
    }
    
    return this.findById(id);
  }

  /**
   * Remove um usuário
   * @param id ID do usuário
   * @returns Promise com boolean indicando sucesso
   */
  async delete(id: string): Promise<boolean> {
    const deleted = await db('usuarios').where('id', id).del();
    return deleted > 0;
  }
} 