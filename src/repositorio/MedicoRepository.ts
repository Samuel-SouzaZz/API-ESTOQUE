import { v4 as uuidv4 } from 'uuid';
import { IBaseRepository } from './BaseRepository';
import Medico, { IMedico } from '../models/Medico';

/**
 * Repositório para gerenciamento de Médicos
 */
export class MedicoRepository implements IBaseRepository<IMedico> {
  private medicos: IMedico[] = [];

  /**
   * Busca todos os médicos cadastrados
   * @returns Promise com lista de médicos
   */
  async findAll(): Promise<IMedico[]> {
    return this.medicos;
  }

  /**
   * Busca um médico pelo ID
   * @param id ID do médico
   * @returns Promise com o médico encontrado ou null
   */
  async findById(id: string): Promise<IMedico | null> {
    const medico = this.medicos.find(m => m.id === id);
    return medico || null;
  }

  /**
   * Cria um novo médico
   * @param data Dados do médico
   * @returns Promise com o médico criado
   */
  async create(data: Partial<IMedico>): Promise<IMedico> {
    const novoMedico = new Medico({
      ...data,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    this.medicos.push(novoMedico);
    return novoMedico;
  }

  /**
   * Atualiza um médico existente
   * @param id ID do médico
   * @param data Dados para atualização
   * @returns Promise com o médico atualizado ou null
   */
  async update(id: string, data: Partial<IMedico>): Promise<IMedico | null> {
    const index = this.medicos.findIndex(m => m.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const medicoAtualizado = new Medico({
      ...this.medicos[index],
      ...data,
      updatedAt: new Date()
    });
    
    this.medicos[index] = medicoAtualizado;
    return medicoAtualizado;
  }

  /**
   * Remove um médico
   * @param id ID do médico
   * @returns Promise com boolean indicando sucesso
   */
  async delete(id: string): Promise<boolean> {
    const index = this.medicos.findIndex(m => m.id === id);
    
    if (index === -1) {
      return false;
    }
    
    this.medicos.splice(index, 1);
    return true;
  }

  /**
   * Busca médicos por nome
   * @param nome Nome ou parte do nome do médico
   * @returns Promise com lista de médicos que correspondem ao critério
   */
  async findByNome(nome: string): Promise<IMedico[]> {
    return this.medicos.filter(m => 
      m.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }
} 