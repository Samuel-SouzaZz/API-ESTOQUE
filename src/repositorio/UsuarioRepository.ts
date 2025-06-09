<<<<<<< HEAD
import { v4 as uuidv4 } from 'uuid';
=======
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
import { IBaseRepository } from './BaseRepository';
import { IUsuario } from '../models/Usuario';
import { UserRole } from '../models/enums/UserRole';
import { db } from '../config/database';

/**
 * Repositório para gerenciamento de Usuários
 * Conectado ao banco SQLite via Knex.js
 */
export class UsuarioRepository implements IBaseRepository<IUsuario> {

<<<<<<< HEAD
/**
 * Repositório para gerenciamento de Usuários
 * Implementa operações CRUD básicas conforme conteúdo da disciplina
 */
export class UsuarioRepository implements IBaseRepository<IUsuario> {
  // Simulando um banco de dados em memória para testes
  private usuarios: IUsuario[] = [];

=======
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
  /**
   * Busca todos os usuários
   * @returns Promise com lista de usuários
   */
  async findAll(): Promise<IUsuario[]> {
<<<<<<< HEAD
    return this.usuarios;
=======
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
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
  }

  /**
   * Busca usuário por ID
   * @param id ID do usuário
   * @returns Promise com o usuário encontrado ou null
   */
  async findById(id: string): Promise<IUsuario | null> {
<<<<<<< HEAD
    const usuario = this.usuarios.find(u => u.id === id);
    return usuario || null;
  }

  /**
   * Busca usuário por email (método específico para autenticação)
=======
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
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
   * @param email Email do usuário
   * @returns Promise com o usuário encontrado ou null
   */
  async findByEmail(email: string): Promise<IUsuario | null> {
<<<<<<< HEAD
    const usuario = this.usuarios.find(u => u.email === email);
    return usuario || null;
=======
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
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
  }

  /**
   * Cria um novo usuário
   * @param userData Dados do usuário
   * @returns Promise com o usuário criado
   */
  async create(userData: Partial<IUsuario>): Promise<IUsuario> {
<<<<<<< HEAD
    const novoUsuario: IUsuario = {
      id: uuidv4(),
      nome: userData.nome || '',
      email: userData.email || '',
      senha: userData.senha || '',
      role: userData.role || UserRole.PACIENTE,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.usuarios.push(novoUsuario);
    return novoUsuario;
=======
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
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
  }

  /**
   * Atualiza um usuário
   * @param id ID do usuário
   * @param userData Dados para atualização
   * @returns Promise com o usuário atualizado ou null
   */
  async update(id: string, userData: Partial<IUsuario>): Promise<IUsuario | null> {
<<<<<<< HEAD
    const index = this.usuarios.findIndex(u => u.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const usuarioAtualizado: IUsuario = {
      ...this.usuarios[index],
      ...userData,
      updatedAt: new Date()
    };
    
    this.usuarios[index] = usuarioAtualizado;
    return usuarioAtualizado;
=======
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
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
  }

  /**
   * Remove um usuário
   * @param id ID do usuário
   * @returns Promise com boolean indicando sucesso
   */
  async delete(id: string): Promise<boolean> {
<<<<<<< HEAD
    const index = this.usuarios.findIndex(u => u.id === id);
    
    if (index === -1) {
      return false;
    }
    
    this.usuarios.splice(index, 1);
    return true;
=======
    const deleted = await db('usuarios').where('id', id).del();
    return deleted > 0;
>>>>>>> 0a1e485a98b23f75eff342694de62ccfe0f8884d
  }
} 