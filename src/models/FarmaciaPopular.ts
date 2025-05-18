// Interface para o documento de Farmácia Popular
export interface IFarmaciaPopular {
  id: string;
  nome: string;
  telefone: string;
  createdAt: Date;
  updatedAt: Date;
}

// Classe FarmaciaPopular
export class FarmaciaPopular implements IFarmaciaPopular {
  id: string;
  nome: string;
  telefone: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<IFarmaciaPopular>) {
    this.id = data.id || '';
    this.nome = data.nome || '';
    this.telefone = data.telefone || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

export default FarmaciaPopular; 