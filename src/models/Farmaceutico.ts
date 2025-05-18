// Interface para o documento de Farmacêutico
export interface IFarmaceutico {
  id: string;
  nome: string;
  createdAt: Date;
  updatedAt: Date;
}

// Classe Farmaceutico
export class Farmaceutico implements IFarmaceutico {
  id: string;
  nome: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<IFarmaceutico>) {
    this.id = data.id || '';
    this.nome = data.nome || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

export default Farmaceutico; 