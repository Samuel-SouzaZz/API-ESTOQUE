import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UsuarioRepository } from '../repositorio/UsuarioRepository';
import { IUsuario } from '../models/Usuario';
import { UserRole } from '../models/enums/UserRole';

export class AuthService {
  private usuarioRepository: UsuarioRepository;

  constructor() {
    this.usuarioRepository = new UsuarioRepository();
  }

  /**
   * Registra um novo usuário
   */
  async register(nome: string, email: string, senha: string, role: UserRole = UserRole.PACIENTE): Promise<IUsuario> {
    // Verifica se o usuário já existe
    const usuarioExistente = await this.usuarioRepository.findByEmail(email);
    if (usuarioExistente) {
      throw new Error('Usuário já existe com este email');
    }

    // Criptografa a senha conforme a matéria
    const senhaHash = await bcrypt.hash(senha, 10);

    // Cria o usuário
    const novoUsuario = await this.usuarioRepository.create({
      nome,
      email,
      senha: senhaHash,
      role
    });

    return novoUsuario;
  }

  /**
   * Faz login do usuário
   */
  async login(email: string, senha: string): Promise<{ usuario: Omit<IUsuario, 'senha'>, token: string }> {
    // Busca o usuário por email
    const usuario = await this.usuarioRepository.findByEmail(email);
    if (!usuario) {
      throw new Error('Email ou senha incorretos');
    }

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error('Email ou senha incorretos');
    }

    // Gera o token JWT conforme a matéria
    const token = this.generateToken(usuario);

    // Remove a senha do retorno
    const { senha: _, ...usuarioSemSenha } = usuario;

    return {
      usuario: usuarioSemSenha,
      token
    };
  }

  /**
   * Gera token JWT conforme especificação da matéria
   */
  private generateToken(usuario: IUsuario): string {
    const JWT_SECRET = process.env.JWT_SECRET;
    const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '24h';

    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET não está configurado no .env');
    }

    // Payload do token conforme a matéria
    const payload = {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role
    };

    // Gera o token com Header, Payload e Signature conforme a matéria
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '24h' });
  }

  /**
   * Verifica e decodifica o token JWT
   */
  verifyToken(token: string): any {
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET não está configurado no .env');
    }

    try {
      // Valida o token conforme a matéria:
      // - Decodifica o token
      // - Verifica a assinatura
      // - Verifica se já passou o tempo de expiração (exp)
      return jwt.verify(token, JWT_SECRET);
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new Error('Token expirado');
      }
      if (error.name === 'JsonWebTokenError') {
        throw new Error('Token inválido');
      }
      throw new Error('Erro ao verificar token');
    }
  }
} 