
/**
 * Данные для смены пароля
 */
export interface IAccountChangePassword
{
  /**
   * Текущий пароль
   */
  currentPassword: string;

  /**
   * Новый пароль
   */
  newPassword: string;

  /**
   * Хешированное значение идентификатора для прямого доступа
   */
  hashId: string;
}