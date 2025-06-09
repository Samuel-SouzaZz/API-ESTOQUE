import { IControleEstoque } from '../models/ControleEstoque';
import { StatusControleEstoque } from '../models/enums/StartusControleEstoque';
import { repositories } from '../repositorio';

/**
 * Serviço para gerenciamento de Controle de Estoque
 * Implementa operações de controle de estoque
 */
export class ControleEstoqueService {
  /**
   * Busca todos os registros de controle de estoque
   */
  async findAll(): Promise<IControleEstoque[]> {
    return repositories.controleEstoqueRepository.findAll();
  }

  /**
   * Busca um registro pelo ID
   */
  async findById(id: string): Promise<IControleEstoque | null> {
    return repositories.controleEstoqueRepository.findById(id);
  }

  /**
   * Cria uma nova solicitação de medicamento
   */
  async create(data: Partial<IControleEstoque>): Promise<IControleEstoque> {
    // Validações obrigatórias
    if (!data.medicoId) {
      throw new Error('Médico é obrigatório');
    }

    if (!data.pacienteId) {
      throw new Error('Paciente é obrigatório');
    }

    if (!data.estoqueId) {
      throw new Error('Estoque é obrigatório');
    }

    if (!data.quantidade || data.quantidade <= 0) {
      throw new Error('Quantidade deve ser maior que zero');
    }

    // Cria com status inicial "Reservado"
    return repositories.controleEstoqueRepository.create({
      ...data,
      status: StatusControleEstoque.Reservado
    });
  }

  /**
   * Atualiza um registro
   */
  async update(id: string, data: Partial<IControleEstoque>): Promise<IControleEstoque | null> {
    return repositories.controleEstoqueRepository.update(id, data);
  }

  /**
   * Remove um registro
   */
  async delete(id: string): Promise<boolean> {
    return repositories.controleEstoqueRepository.delete(id);
  }

  /**
   * Atualiza o status de uma solicitação
   */
  async atualizarStatus(id: string, status: string): Promise<IControleEstoque | null> {
    return repositories.controleEstoqueRepository.atualizarStatus(id, status);
  }

  /**
   * Busca solicitações por médico
   */
  async findByMedico(medicoId: string): Promise<IControleEstoque[]> {
    return repositories.controleEstoqueRepository.findByMedico(medicoId);
  }

  /**
   * Busca solicitações por paciente
   */
  async findByPaciente(pacienteId: string): Promise<IControleEstoque[]> {
    return repositories.controleEstoqueRepository.findByPaciente(pacienteId);
  }

  /**
   * Busca solicitações por status
   */
  async findByStatus(status: string): Promise<IControleEstoque[]> {
    return repositories.controleEstoqueRepository.findByStatus(status);
  }

  /**
   * Gera relatório de controle de estoque
   */
  async relatorio(): Promise<any> {
    // Relatório - conta total de registros por status
    const todos = await this.findAll();
    
    const relatorio = {
      total: todos.length,
      reservados: todos.filter(item => item.status === StatusControleEstoque.Reservado).length,
      concluidos: todos.filter(item => item.status === StatusControleEstoque.Concluido).length,
      cancelados: todos.filter(item => item.status === StatusControleEstoque.Cancelado).length
    };

    return relatorio;
  }
} 