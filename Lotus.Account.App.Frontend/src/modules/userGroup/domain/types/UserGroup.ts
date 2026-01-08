import type { IEntity } from 'lotus-core/types';

/**
 * Интерфейс группы
 */
export interface IUserGroup extends IEntity<number>
{
  /**
   * Наименование группы
   */
  name: string;

  /**
   * Отображаемое наименование группы
   */
  displayName?: string;
}

/**
 * Интерфейс группы для сохранения
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IUserGroupDatasave extends IUserGroup
{

}
