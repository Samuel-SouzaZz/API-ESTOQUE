// Interface para o documento de Lote
export interface ILote {
  id: string;
  dataFabricacao: Date;
  dataValidade: Date;
  codigo: string;
  produtoId: string;
  quantidade: number;
  fornecedorId: string;
  observacoes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Classe Lote
export class Lote implements ILote {
  id: string;
  dataFabricacao: Date;
  dataValidade: Date;
  codigo: string;
  produtoId: string;
  quantidade: number;
  fornecedorId: string;
  observacoes?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<ILote>) {
    this.id = data.id || '';
    this.dataFabricacao = data.dataFabricacao || new Date();
    this.dataValidade = data.dataValidade || new Date();
    this.codigo = data.codigo || '';
    this.produtoId = data.produtoId || '';
    this.quantidade = data.quantidade || 0;
    this.fornecedorId = data.fornecedorId || '';
    this.observacoes = data.observacoes;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

export default Lote; 