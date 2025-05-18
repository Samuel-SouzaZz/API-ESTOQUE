import { IBaseService } from './BaseService';
import { IControleEstoque } from '../models/ControleEstoque';
import { StatusControleEstoque } from '../models/enums/StartusControleEstoque';
import { repositories } from '../repositorio';

/**
 * Serviço para gerenciamento de Controle de Estoque
 * Implementa a lógica de negócios para solicitações de medicamentos
 */
export class ControleEstoqueService implements IBaseService<IControleEstoque> {
  /**
   * Busca todos os registros de controle de estoque
   * @returns Promise com lista de registros de controle
   */
  async findAll(): Promise<IControleEstoque[]> {
    return repositories.controleEstoqueRepository.findAll();
  }

  /**
   * Busca um registro de controle de estoque pelo ID
   * @param id ID do registro de controle
   * @returns Promise com o registro encontrado ou null
   */
  async findById(id: string): Promise<IControleEstoque | null> {
    return repositories.controleEstoqueRepository.findById(id);
  }

  /**
   * Cria um novo registro de controle de estoque (solicitação de medicamento)
   * @param data Dados do registro de controle
   * @returns Promise com o registro criado
   * @throws Error se os dados obrigatórios não forem fornecidos ou se não houver estoque suficiente
   */
  async create(data: Partial<IControleEstoque>): Promise<IControleEstoque> {
    // Validação de dados obrigatórios
    if (!data.medicoId) {
      throw new Error('O médico é obrigatório');
    }

    if (!data.pacienteId) {
      throw new Error('O paciente é obrigatório');
    }

    if (!data.estoqueId) {
      throw new Error('O estoque é obrigatório');
    }

    if (!data.quantidade || data.quantidade <= 0) {
      throw new Error('A quantidade deve ser maior que zero');
    }

    // Verifica se o médico existe
    const medico = await repositories.medicoRepository.findById(data.medicoId);
    if (!medico) {
      throw new Error('Médico não encontrado');
    }

    // Verifica se o paciente existe
    const paciente = await repositories.pacienteRepository.findById(data.pacienteId);
    if (!paciente) {
      throw new Error('Paciente não encontrado');
    }

    // Verifica se o estoque existe
    const estoque = await repositories.estoqueRepository.findById(data.estoqueId);
    if (!estoque) {
      throw new Error('Estoque não encontrado');
    }

    // Verifica se há quantidade suficiente em estoque
    const disponivel = await repositories.estoqueRepository.verificarDisponibilidade(
      data.estoqueId, 
      data.quantidade
    );

    if (!disponivel) {
      throw new Error('Quantidade insuficiente em estoque');
    }

    // Cria o registro de controle de estoque com status inicial "Reservado"
    return repositories.controleEstoqueRepository.create({
      ...data,
      status: StatusControleEstoque.Reservado
    });
  }

  /**
   * Atualiza um registro de controle de estoque existente
   * @param id ID do registro de controle
   * @param data Dados para atualização
   * @returns Promise com o registro atualizado ou null
   */
  async update(id: string, data: Partial<IControleEstoque>): Promise<IControleEstoque | null> {
    // Verifica se o registro de controle existe
    const controleExistente = await this.findById(id);
    if (!controleExistente) {
      return null;
    }

    return repositories.controleEstoqueRepository.update(id, data);
  }

  /**
   * Remove um registro de controle de estoque
   * @param id ID do registro de controle
   * @returns Promise com boolean indicando sucesso
   */
  async delete(id: string): Promise<boolean> {
    // Verifica se o registro de controle existe
    const controleExistente = await this.findById(id);
    if (!controleExistente) {
      return false;
    }

    return repositories.controleEstoqueRepository.delete(id);
  }

  /**
   * Atualiza o status de um controle de estoque
   * @param id ID do registro de controle
   * @param status Novo status
   * @returns Promise com o registro atualizado ou null
   * @throws Error se o status for inválido ou se a operação não for permitida
   */
  async atualizarStatus(id: string, status: string): Promise<IControleEstoque | null> {
    // Verifica se o status é válido
    if (![StatusControleEstoque.Reservado, StatusControleEstoque.Concluido, StatusControleEstoque.Cancelado].includes(status as any)) {
      throw new Error('Status inválido');
    }

    // Busca o controle de estoque atual
    const controleAtual = await this.findById(id);
    if (!controleAtual) {
      return null;
    }

    // Verifica se o status já é o mesmo
    if (controleAtual.status === status) {
      return controleAtual;
    }

    // Atualiza o estoque se necessário
    if (status === StatusControleEstoque.Concluido && controleAtual.status === StatusControleEstoque.Reservado) {
      // Reduz a quantidade em estoque quando a solicitação é concluída
      await repositories.estoqueRepository.atualizarQuantidade(
        controleAtual.estoqueId,
        controleAtual.quantidade,
        false // subtrai a quantidade
      );
    } else if (status === StatusControleEstoque.Cancelado && controleAtual.status === StatusControleEstoque.Reservado) {
      // Se a solicitação for cancelada, não há alteração no estoque físico
      // pois a reserva apenas é desfeita
    } else if (status === StatusControleEstoque.Reservado && controleAtual.status === StatusControleEstoque.Concluido) {
      // Não permite voltar de "Concluído" para "Reservado"
      throw new Error('Não é possível voltar de Concluído para Reservado');
    }

    // Atualiza o status
    return repositories.controleEstoqueRepository.atualizarStatus(id, status);
  }

  /**
   * Busca registros de controle de estoque por médico
   * @param medicoId ID do médico
   * @returns Promise com lista de registros de controle do médico
   */
  async findByMedico(medicoId: string): Promise<IControleEstoque[]> {
    return repositories.controleEstoqueRepository.findByMedico(medicoId);
  }

  /**
   * Busca registros de controle de estoque por paciente
   * @param pacienteId ID do paciente
   * @returns Promise com lista de registros de controle do paciente
   */
  async findByPaciente(pacienteId: string): Promise<IControleEstoque[]> {
    return repositories.controleEstoqueRepository.findByPaciente(pacienteId);
  }

  /**
   * Busca registros de controle de estoque por estoque
   * @param estoqueId ID do estoque
   * @returns Promise com lista de registros de controle do estoque
   */
  async findByEstoque(estoqueId: string): Promise<IControleEstoque[]> {
    return repositories.controleEstoqueRepository.findByEstoque(estoqueId);
  }

  /**
   * Busca registros de controle de estoque por status
   * @param status Status a ser filtrado
   * @returns Promise com lista de registros com o status especificado
   */
  async findByStatus(status: string): Promise<IControleEstoque[]> {
    return repositories.controleEstoqueRepository.findByStatus(status);
  }

  /**
   * Gera um relatório simples de solicitações por período
   * @param dataInicio Data de início do período
   * @param dataFim Data de fim do período
   * @returns Promise com relatório de contagem por status
   */
  async relatorioSolicitacoesPorPeriodo(
    dataInicio: Date, 
    dataFim: Date
  ): Promise<Record<string, number>> {
    return repositories.controleEstoqueRepository.relatorioSolicitacoesPorPeriodo(
      dataInicio,
      dataFim
    );
  }
} 