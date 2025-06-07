import { UserRole } from '../../models/enums/UserRole';

// DTO para retorno de usuário (sem senha)
export class UserDTO {
  id!: string;
  nome!: string;
  email!: string;
  role!: UserRole;
  createdAt!: Date;
  updatedAt!: Date;
}

// DTO para atualização de usuário
export class UpdateUserDTO {
  nome?: string;
  email?: string;
  senha?: string;
  role?: UserRole;
}

// DTO para resposta de autenticação
export class AuthResponseDTO {
  token!: string;
  user!: UserDTO;
}

// DTO para login
export class LoginDTO {
  email!: string;
  senha!: string;
}

// DTO para filtro de usuários
export class UserFilterDTO {
  nome?: string;
  email?: string;
  role?: UserRole;
  page?: number = 1;
  limit?: number = 10;
  sortBy?: string = 'nome';
  order?: 'asc' | 'desc' = 'asc';
}
