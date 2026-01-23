import type { IRequest } from 'lotus-core/modules/requestAndResponse';

/**
 * Запрос на получения всех разрешений
 */
export interface IUserPermissionsRequest extends IRequest
{
  /**
   * Список идентификаторов разрешений
   */
  ids?: number[];
}