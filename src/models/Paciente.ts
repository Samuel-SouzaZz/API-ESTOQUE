// Interface para o documento de Paciente
export interface IPaciente {
  id: string;
  nome: string;
  createdAt: Date;
  updatedAt: Date;
}

// Classe Paciente
export class Paciente implements IPaciente {
  id: string;
  nome: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<IPaciente>) {
    this.id = data.id || '';
    this.nome = data.nome || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

export default Paciente; 