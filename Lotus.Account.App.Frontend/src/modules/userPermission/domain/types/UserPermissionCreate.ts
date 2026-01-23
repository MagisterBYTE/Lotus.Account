
/**
 * Интерфейс разрешения для его создания
 */
export interface IUserPermissionCreate
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
