/**
 *  Регистрация нового пользователя
 */
export interface IRegisterParameters
{
  /**
   * Логин
   */
  login: string;

  /**
   * Email
   */
  email: string;

  /**
   * Пароль
   */
  password: string;
}
