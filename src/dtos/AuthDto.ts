import { UserRole } from '../models/enums/UserRole';

// Interface para criação de usuário
export interface CreateUserDto {
  nome: string;
  email: string;
  senha: string;
  role?: UserRole;
}

// Interface para login
export interface LoginDto {
  email: string;
  senha: string;
}

// Interface para resposta de autenticação
export interface AuthResponseDto {
  token: string;
  user: {
    id: string;
    nome: string;
    email: string;
    role: UserRole;
  };
} 