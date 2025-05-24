import { UserRole } from '../enums/UserRole';

// Interface para o documento de Usuario
export interface IUsuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Classe Usuario
export class Usuario implements IUsuario {
  id: string;
  nome: string;
  email: string;
  senha: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<IUsuario>) {
    this.id = data.id || '';
    this.nome = data.nome || '';
    this.email = data.email || '';
    this.senha = data.senha || '';
    this.role = data.role || UserRole.PACIENTE;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

export default Usuario; 