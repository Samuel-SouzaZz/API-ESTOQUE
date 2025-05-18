import { StatusControleEstoque } from "./enums/StartusControleEstoque";
// Interface para o documento de Controle de Estoque
export interface IControleEstoque {
  id: string;
  medicoId: string;
  pacienteId: string;
  estoqueId: string;
  quantidade: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
// Classe ControleEstoque
export class ControleEstoque implements IControleEstoque {
  id: string;
  medicoId: string;
  pacienteId: string;
  estoqueId: string;
  quantidade: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<IControleEstoque>) {
    this.id = data.id || '';
    this.medicoId = data.medicoId || '';
    this.pacienteId = data.pacienteId || '';
    this.estoqueId = data.estoqueId || '';
    this.quantidade = data.quantidade || 0;
    this.status = data.status || StatusControleEstoque.Reservado;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

export default ControleEstoque; 