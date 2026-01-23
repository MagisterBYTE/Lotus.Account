import type { IEntity, TKey } from 'lotus-core/types';

/**
 * Интерфейс разрешения
 */
export interface IUserPermission extends IEntity<TKey>
{
  /**
   * Наименование разрешения
   */
  name: string;

  /**
   * Отображаемое наименование разрешения
   */
  displayName?: string;

  /**
   * Флаг, указывающий, что разрешение является новым и еще не сохранено в базе данных
   */
  isNew: boolean;
}

/**
 * Интерфейс разрешения для сохранения
 */
export interface IUserPermissionDatasave extends Omit<IUserPermission, 'id'|'isNew'>
{
  id: number;
}
