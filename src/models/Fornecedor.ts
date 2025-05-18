import { StatusFornecedor } from "./enums/statusFornecedor";

// Interface para o documento de Fornecedor
export interface IFornecedor {
  id: string;
  nome: string;
  status: string;
  telefone: string;
  createdAt: Date;
  updatedAt: Date;
}
// Classe Fornecedor
export class Fornecedor implements IFornecedor {
  id: string;
  nome: string;
  status: string;
  telefone: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<IFornecedor>) {
    this.id = data.id || '';
    this.nome = data.nome || '';
    this.status = data.status || StatusFornecedor.Disponivel;
    this.telefone = data.telefone || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

export default Fornecedor; 