import type { IEntity } from "lotus-core/types";

/**
 * Интерфейс должности
 */
export interface IUserPosition extends IEntity<number>
{
  /**
   * Наименование должности
   */
  name: string;

  /**
   * Отображаемое наименование должности
   */
  displayName?: string;
}

/**
 * Интерфейс должности для сохранения
 */
export interface IUserPositionDatasave extends IUserPosition
{
}
