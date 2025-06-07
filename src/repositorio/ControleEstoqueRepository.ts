import { v4 as uuidv4 } from 'uuid';
import { IBaseRepository } from './BaseRepository';
import ControleEstoque, { IControleEstoque } from '../models/ControleEstoque';
import { StatusControleEstoque } from '../models/enums/StartusControleEstoque';

/**
 * Repositório para gerenciamento de Controle de Estoque
 * Implementa operações CRUD básicas conforme conteúdo da disciplina
 */
export class ControleEstoqueRepository implements IBaseRepository<IControleEstoque> {
  // Simulando um banco de dados em memória para testes
  private controles: IControleEstoque[] = [];

  /**
   * Busca todos os registros de controle de estoque
   * @returns Promise com lista de registros de controle
   */
  async findAll(): Promise<IControleEstoque[]> {
    return this.controles;
  }

  /**
   * Busca um registro de controle de estoque pelo ID
   * @param id ID do registro de controle
   * @returns Promise com o registro encontrado ou null
   */
  async findById(id: string): Promise<IControleEstoque | null> {
    const controle = this.controles.find(c => c.id === id);
    return controle || null;
  }

  /**
   * Cria um novo registro de controle de estoque (solicitação de medicamento)
   * @param data Dados do registro de controle
   * @returns Promise com o registro criado
   */
  async create(data: Partial<IControleEstoque>): Promise<IControleEstoque> {
    const novoControle = new ControleEstoque({
      ...data,
      id: uuidv4(),
      status: data.status || StatusControleEstoque.Reservado,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    this.controles.push(novoControle);
    return novoControle;
  }

  /**
   * Atualiza um registro de controle de estoque existente
   * @param id ID do registro de controle
   * @param data Dados para atualização
   * @returns Promise com o registro atualizado ou null
   */
  async update(id: string, data: Partial<IControleEstoque>): Promise<IControleEstoque | null> {
    const index = this.controles.findIndex(c => c.id === id);
    
    if (index === -1) {
      return null;
    }
    
    const controleAtualizado = new ControleEstoque({
      ...this.controles[index],
      ...data,
      updatedAt: new Date()
    });
    
    this.controles[index] = controleAtualizado;
    return controleAtualizado;
  }

  /**
   * Remove um registro de controle de estoque
   * @param id ID do registro de controle
   * @returns Promise com boolean indicando sucesso
   */
  async delete(id: string): Promise<boolean> {
    const index = this.controles.findIndex(c => c.id === id);
    
    if (index === -1) {
      return false;
    }
    
    this.controles.splice(index, 1);
    return true;
  }

  /**
   * Atualiza o status de um controle de estoque (funcionalidade básica)
   * @param id ID do registro de controle
   * @param status Novo status
   * @returns Promise com o registro atualizado ou null
   */
  async atualizarStatus(id: string, status: string): Promise<IControleEstoque | null> {
    return this.update(id, { status });
  }

  /**
   * Busca registros por médico (filtro básico conforme matéria)
   * @param medicoId ID do médico
   * @returns Promise com lista de registros do médico
   */
  async findByMedico(medicoId: string): Promise<IControleEstoque[]> {
    return this.controles.filter(c => c.medicoId === medicoId);
  }

  /**
   * Busca registros por paciente (filtro básico conforme matéria)
   * @param pacienteId ID do paciente
   * @returns Promise com lista de registros do paciente
   */
  async findByPaciente(pacienteId: string): Promise<IControleEstoque[]> {
    return this.controles.filter(c => c.pacienteId === pacienteId);
  }

  /**
   * Busca registros por status (filtro básico conforme matéria)
   * @param status Status a ser filtrado
   * @returns Promise com lista de registros com o status especificado
   */
  async findByStatus(status: string): Promise<IControleEstoque[]> {
    return this.controles.filter(c => c.status === status);
  }
} 