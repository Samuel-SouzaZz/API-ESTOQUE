/**
 * Interface base para todos os serviços
 * Define operações comuns que todos os serviços devem implementar
 */
export interface IBaseService<T> {
  /**
   * Busca todos os registros
   * @returns Promise com um array de entidades
   */
  findAll(): Promise<T[]>;
  
  /**
   * Busca um registro pelo ID
   * @param id Identificador único do registro
   * @returns Promise com a entidade encontrada ou null se não existir
   */
  findById(id: string): Promise<T | null>;
  
  /**
   * Cria um novo registro
   * @param data Dados para criar a entidade
   * @returns Promise com a entidade criada
   */
  create(data: Partial<T>): Promise<T>;
  
  /**
   * Atualiza um registro existente
   * @param id Identificador único do registro
   * @param data Dados para atualizar
   * @returns Promise com a entidade atualizada ou null se não existir
   */
  update(id: string, data: Partial<T>): Promise<T | null>;
  
  /**
   * Remove um registro
   * @param id Identificador único do registro
   * @returns Promise com boolean indicando sucesso
   */
  delete(id: string): Promise<boolean>;
} 