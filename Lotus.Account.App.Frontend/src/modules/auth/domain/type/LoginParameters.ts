/**
 *  Вход по логину и паролю
 */
export interface ILoginParameters
{
  /**
   * Логин
   */
  login: string;

  /**
   * Пароль
   */
  password: string;

  /**
   * Запомнить меня
   */
  rememberMe: boolean;
}
