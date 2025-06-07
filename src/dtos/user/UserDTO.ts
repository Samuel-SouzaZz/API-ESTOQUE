import { UserRole } from '../../models/enums/UserRole';

// DTO para retorno de usuário (sem senha)
export class UserDTO {
  id!: string;
  name!: string;
  email!: string;
  role!: UserRole;
  active!: boolean;
  created_at!: Date;
  updated_at!: Date;
}

// DTO para atualização de usuário
export class UpdateUserDTO {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  active?: boolean;
}

// DTO para resposta de autenticação
export class AuthResponseDTO {
  token!: string;
  user!: UserDTO;
}

// DTO para login
export class LoginDTO {
  email!: string;
  password!: string;
}

// DTO para filtro de usuários
export class UserFilterDTO {
  name?: string;
  email?: string;
  role?: UserRole;
  active?: boolean;
  page?: number = 1;
  limit?: number = 10;
  sortBy?: string = 'name';
  order?: 'asc' | 'desc' = 'asc';
}
