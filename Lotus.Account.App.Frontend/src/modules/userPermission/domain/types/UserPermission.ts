import type { IEntity } from 'lotus-core/types';

/**
 * Интерфейс разрешения
 */
export interface IUserPermission extends IEntity<number>
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
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUserPermissionDatasave extends Omit<IUserPermission, 'isNew'>
{
  
}
