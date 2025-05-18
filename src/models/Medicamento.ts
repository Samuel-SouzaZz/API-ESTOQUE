import { TarjaMedicamento } from "./enums/tarjamedicamento";
// Interface para o documento de Medicamento
export interface IMedicamento {
  id: string;
  nome: string;
  fornecedorId: string;
  tarja: string;
  createdAt: Date;
  updatedAt: Date;
}
// Classe Medicamento
export class Medicamento implements IMedicamento {
  id: string;
  nome: string;
  fornecedorId: string;
  tarja: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<IMedicamento>) {
    this.id = data.id || '';
    this.nome = data.nome || '';
    this.fornecedorId = data.fornecedorId || '';
    this.tarja = data.tarja || TarjaMedicamento.SemTarja;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

export default Medicamento; 