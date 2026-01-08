import type { IEntity } from 'lotus-core/types';

/**
 * Интерфейс роли
 */
export interface IUserRole extends IEntity<number>
{
  /**
   * Наименование роли
   */
  name: string;

  /**
   * Отображаемое наименование роли
   */
  displayName?: string;

  /** 
   * Список идентификаторов разрешений для данной роли
   */
  permissionIds: number[];
}

/**
 * Интерфейс группы для сохранения
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUserRoleDatasave extends IUserRole
{

}
