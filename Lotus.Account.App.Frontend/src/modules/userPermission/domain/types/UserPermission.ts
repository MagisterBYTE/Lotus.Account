import type { IEntity } from "lotus-core/types";

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
}

/**
 * Интерфейс разрешения для сохранения
 */
export interface IUserPermissionDatasave extends IUserPermission
{

}
