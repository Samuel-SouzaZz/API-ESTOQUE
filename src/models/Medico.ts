// Interface para o documento de Médico
export interface IMedico {
  id: string;
  nome: string;
  createdAt: Date;
  updatedAt: Date;
}

// Classe Medico
export class Medico implements IMedico {
  id: string;
  nome: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<IMedico>) {
    this.id = data.id || '';
    this.nome = data.nome || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

export default Medico; 