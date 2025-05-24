import { Request, Response } from 'express';

/**
 * Interface para padronização das respostas da API
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
}

/**
 * Tipo para funções de controller
 */
export type ControllerFunction = (req: Request, res: Response) => Promise<Response | void>;

/**
 * Função auxiliar para criar resposta de sucesso
 * @param message Mensagem de sucesso
 * @param data Dados a serem retornados
 * @returns Objeto de resposta padronizado
 */
export const successResponse = <T>(message: string, data?: T): ApiResponse<T> => ({
  success: true,
  message,
  data
});

/**
 * Função auxiliar para criar resposta de erro
 * @param message Mensagem de erro
 * @param error Erro detalhado (opcional)
 * @returns Objeto de resposta padronizado
 */
export const errorResponse = (message: string, error?: any): ApiResponse<never> => ({
  success: false,
  message,
  error
}); 