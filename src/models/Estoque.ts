// Interface para o documento de Estoque
export interface IEstoque {
  id: string;
  local: string;
  loteId: string;
  quantidade: number;
  createdAt: Date;
  updatedAt: Date;
}

// Classe Estoque
export class Estoque implements IEstoque {
  id: string;
  local: string;
  loteId: string;
  quantidade: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<IEstoque>) {
    this.id = data.id || '';
    this.local = data.local || '';
    this.loteId = data.loteId || '';
    this.quantidade = data.quantidade || 0;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

export default Estoque; 