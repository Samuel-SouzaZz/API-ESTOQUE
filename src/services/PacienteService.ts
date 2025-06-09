import { IPaciente } from '../models/Paciente';
import { repositories } from '../repositorio';

/**
 * Serviço para gerenciamento de Pacientes
 * Implementa a lógica de negócios
 */
export class PacienteService {
  /**
   * Busca todos os pacientes
   */
  async findAll(): Promise<IPaciente[]> {
    return repositories.pacienteRepository.findAll();
  }

  /**
   * Busca um paciente pelo ID
   */
  async findById(id: string): Promise<IPaciente | null> {
    return repositories.pacienteRepository.findById(id);
  }

  /**
   * Cria um novo paciente
   */
  async create(data: Partial<IPaciente>): Promise<IPaciente> {
    // Validação obrigatória
    if (!data.nome) {
      throw new Error('Nome é obrigatório');
    }

    return repositories.pacienteRepository.create(data);
  }

  /**
   * Atualiza um paciente
   */
  async update(id: string, data: Partial<IPaciente>): Promise<IPaciente | null> {
    return repositories.pacienteRepository.update(id, data);
  }

  /**
   * Remove um paciente
   */
  async delete(id: string): Promise<boolean> {
    return repositories.pacienteRepository.delete(id);
  }

  /**
   * Busca pacientes por nome
   */
  async findByNome(nome: string): Promise<IPaciente[]> {
    return repositories.pacienteRepository.findByNome(nome);
  }
} 