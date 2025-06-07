import { v4 as uuidv4 } from 'uuid';
import { IBaseRepository } from './BaseRepository';
import Paciente, { IPaciente } from '../models/Paciente';

/**
 * Repositório para gerenciamento de Pacientes
 */
export class PacienteRepository implements IBaseRepository<IPaciente> {
  private pacientes: IPaciente[] = [];

  /**
   * Busca todos os pacientes cadastrados
   * @returns Promise com lista de pacientes
   */
  async findAll(): Promise<IPaciente[]> {
    return this.pacientes;
  }

  /**
   * Busca um paciente pelo ID
   * @param id ID do paciente
   * @returns Promise com o paciente encontrado ou null
   */
  async findById(id: string): Promise<IPaciente | null> {
    const paciente = this.pacientes.find(p => p.id === id);
    return paciente || null;
  }

  /**
   * Cria um novo paciente
   * @param data Dados do paciente
   * @returns Promise com o paciente criado
   */
  async create(data: Partial<IPaciente>): Promise<IPaciente> {
    const novoPaciente = new Paciente({
      ...data,
      id: uuidv4(),
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    this.pacientes.push(novoPaciente);
    return novoPaciente;
  }

  /**
   * Atualiza um paciente existente
   * @param id ID do paciente
   * @param data Dados para atualização
   * @returns Promise com o paciente atualizado ou null
   */
  async update(id: string, data: Partial<IPaciente>): Promise<IPaciente | null> {
    const index = this.pacientes.findIndex(p => p.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const pacienteAtualizado = new Paciente({
      ...this.pacientes[index],
      ...data,
      updatedAt: new Date()
    });
    
    this.pacientes[index] = pacienteAtualizado;
    return pacienteAtualizado;
  }

  /**
   * Remove um paciente
   * @param id ID do paciente
   * @returns Promise com boolean indicando sucesso
   */
  async delete(id: string): Promise<boolean> {
    const index = this.pacientes.findIndex(p => p.id === id);
    
    if (index === -1) {
      return false;
    }
    
    this.pacientes.splice(index, 1);
    return true;
  }

  /**
   * Busca pacientes por nome
   * @param nome Nome ou parte do nome do paciente
   * @returns Promise com lista de pacientes que correspondem ao critério
   */
  async findByNome(nome: string): Promise<IPaciente[]> {
    return this.pacientes.filter(p => 
      p.nome.toLowerCase().includes(nome.toLowerCase())
    );
  }
} 