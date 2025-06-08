import { IBaseRepository } from './BaseRepository';
import Paciente, { IPaciente } from '../models/Paciente';
import { db } from '../config/database';

/**
 * Repositório para gerenciamento de Pacientes
 * Conectado ao banco SQLite via Knex.js
 */
export class PacienteRepository implements IBaseRepository<IPaciente> {

  /**
   * Busca todos os pacientes cadastrados
   * @returns Promise com lista de pacientes
   */
  async findAll(): Promise<IPaciente[]> {
    const pacientes = await db('pacientes').select('*');
    return pacientes.map(p => new Paciente({
      id: p.id.toString(),
      nome: p.nome,
      createdAt: p.created_at,
      updatedAt: p.updated_at
    }));
  }

  /**
   * Busca um paciente pelo ID
   * @param id ID do paciente
   * @returns Promise com o paciente encontrado ou null
   */
  async findById(id: string): Promise<IPaciente | null> {
    const paciente = await db('pacientes').where('id', id).first();
    
    if (!paciente) {
      return null;
    }
    
    return new Paciente({
      id: paciente.id.toString(),
      nome: paciente.nome,
      createdAt: paciente.created_at,
      updatedAt: paciente.updated_at
    });
  }

  /**
   * Cria um novo paciente
   * @param data Dados do paciente
   * @returns Promise com o paciente criado
   */
  async create(data: Partial<IPaciente>): Promise<IPaciente> {
    const [id] = await db('pacientes').insert({
      nome: data.nome,
      cpf: '000.000.000-00', // valor padrão
      data_nascimento: new Date('1990-01-01'), // valor padrão
      created_at: new Date(),
      updated_at: new Date()
    });
    
    const pacienteCriado = await this.findById(id.toString());
    return pacienteCriado!;
  }

  /**
   * Atualiza um paciente existente
   * @param id ID do paciente
   * @param data Dados para atualização
   * @returns Promise com o paciente atualizado ou null
   */
  async update(id: string, data: Partial<IPaciente>): Promise<IPaciente | null> {
    const updated = await db('pacientes')
      .where('id', id)
      .update({
        nome: data.nome,
        updated_at: new Date()
      });
    
    if (updated === 0) {
      return null;
    }
    
    return this.findById(id);
  }

  /**
   * Remove um paciente
   * @param id ID do paciente
   * @returns Promise com boolean indicando sucesso
   */
  async delete(id: string): Promise<boolean> {
    const deleted = await db('pacientes').where('id', id).del();
    return deleted > 0;
  }

  /**
   * Busca pacientes por nome
   * @param nome Nome ou parte do nome do paciente
   * @returns Promise com lista de pacientes que correspondem ao critério
   */
  async findByNome(nome: string): Promise<IPaciente[]> {
    const pacientes = await db('pacientes')
      .where('nome', 'like', `%${nome}%`)
      .select('*');
    
    return pacientes.map(p => new Paciente({
      id: p.id.toString(),
      nome: p.nome,
      createdAt: p.created_at,
      updatedAt: p.updated_at
    }));
  }
} 