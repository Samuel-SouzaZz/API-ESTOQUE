import { db } from '../config/database';
import { IUsuario } from '../models/Usuario';
import { UserRole } from '../models/enums/UserRole';

export class UsuarioRepository {
  /**
   * Busca todos os usuários
   */
  async findAll(): Promise<IUsuario[]> {
    return await db('usuarios').select('*').orderBy('created_at', 'desc');
  }

  /**
   * Busca usuário por ID
   */
  async findById(id: string): Promise<IUsuario | null> {
    const usuario = await db('usuarios').where({ id }).first();
    return usuario || null;
  }

  /**
   * Busca usuário por email
   */
  async findByEmail(email: string): Promise<IUsuario | null> {
    const usuario = await db('usuarios').where({ email }).first();
    return usuario || null;
  }

  /**
   * Cria um novo usuário
   */
  async create(userData: Partial<IUsuario>): Promise<IUsuario> {
    const [id] = await db('usuarios').insert({
      ...userData,
      role: userData.role || UserRole.PACIENTE,
      created_at: new Date(),
      updated_at: new Date()
    }).returning('id');
    
    const novoUsuario = await this.findById(id);
    if (!novoUsuario) {
      throw new Error('Erro ao criar usuário');
    }
    return novoUsuario;
  }

  /**
   * Atualiza um usuário
   */
  async update(id: string, userData: Partial<IUsuario>): Promise<IUsuario | null> {
    await db('usuarios').where({ id }).update({
      ...userData,
      updated_at: new Date()
    });
    return await this.findById(id);
  }

  /**
   * Deleta um usuário
   */
  async delete(id: string): Promise<boolean> {
    const deletedRows = await db('usuarios').where({ id }).del();
    return deletedRows > 0;
  }
} 