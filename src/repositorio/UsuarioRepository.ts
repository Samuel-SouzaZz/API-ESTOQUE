import { v4 as uuidv4 } from 'uuid';
import { IBaseRepository } from './BaseRepository';
import { IUsuario } from '../models/Usuario';
import { UserRole } from '../models/enums/UserRole';

/**
 * Repositório para gerenciamento de Usuários
 */
export class UsuarioRepository implements IBaseRepository<IUsuario> {
  private usuarios: IUsuario[] = [];

  /**
   * Busca todos os usuários
   * @returns Promise com lista de usuários
   */
  async findAll(): Promise<IUsuario[]> {
    return this.usuarios;
  }

  /**
   * Busca usuário por ID
   * @param id ID do usuário
   * @returns Promise com o usuário encontrado ou null
   */
  async findById(id: string): Promise<IUsuario | null> {
    const usuario = this.usuarios.find(u => u.id === id);
    return usuario || null;
  }

  /**
   * Busca usuário por email
   * @param email Email do usuário
   * @returns Promise com o usuário encontrado ou null
   */
  async findByEmail(email: string): Promise<IUsuario | null> {
    const usuario = this.usuarios.find(u => u.email === email);
    return usuario || null;
  }

  /**
   * Cria um novo usuário
   * @param userData Dados do usuário
   * @returns Promise com o usuário criado
   */
  async create(userData: Partial<IUsuario>): Promise<IUsuario> {
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
  }

  /**
   * Atualiza um usuário
   * @param id ID do usuário
   * @param userData Dados para atualização
   * @returns Promise com o usuário atualizado ou null
   */
  async update(id: string, userData: Partial<IUsuario>): Promise<IUsuario | null> {
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
  }

  /**
   * Remove um usuário
   * @param id ID do usuário
   * @returns Promise com boolean indicando sucesso
   */
  async delete(id: string): Promise<boolean> {
    const index = this.usuarios.findIndex(u => u.id === id);
    
    if (index === -1) {
      return false;
    }
    
    this.usuarios.splice(index, 1);
    return true;
  }
} 