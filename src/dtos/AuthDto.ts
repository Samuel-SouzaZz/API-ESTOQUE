import { IsString, IsEmail, MinLength, IsEnum, IsOptional } from 'class-validator';

// Enum para definir os roles possíveis
export enum UserRole {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user'
}

// Interface para criação de usuário
export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

// Interface para login
export interface LoginDto {
  email: string;
  password: string;
}

// Interface para resposta de autenticação
export interface AuthResponseDto {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  };
} 