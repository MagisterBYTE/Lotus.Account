import { BaseCommand, CommandService, CommandServiceClass, ICommand, NavigationCommand } from 'lotus-core-react';
import { routesAccount } from 'app/routes';
import { localizationAccount } from 'localization';

class AuthCommandsClass extends CommandServiceClass
{
  private static _AuthCommands: AuthCommandsClass;

  public static override get Instance(): AuthCommandsClass 
  {
    return (this._AuthCommands || (this._AuthCommands = new this()));
  }

  // #region СВОЙСТВА
  /**
   * Вход
   */
  login: ICommand;

  /**
   * Автоматический вход на сайт
   */
  autoLogin: ICommand;

  /**
   * Зарегистрироваться
   */
  register: ICommand;

  /**
   * Восстановить пароль
   */
  restorePassword: ICommand;

  /**
   * Выход
   */
  logout: ICommand;
  // #endregion 

  constructor() 
  {
    super();

    this.login = new NavigationCommand('login', routesAccount.login);
    this.login.label = localizationAccount.auth.entrance;
    this.login.group = 'auth';
    this.commands.push(this.login);

    this.autoLogin = new NavigationCommand('autoLogin', routesAccount.autoLogin);
    this.autoLogin.label = localizationAccount.auth.autoComeIn;
    this.autoLogin.group = 'auth';
    this.commands.push(this.autoLogin);

    this.register = new NavigationCommand('register', routesAccount.register);
    this.register.label = localizationAccount.auth.register;
    this.register.group = 'auth';
    this.commands.push(this.register);

    this.restorePassword = new NavigationCommand('restorePassword', routesAccount.restorePassword);
    this.restorePassword.label = localizationAccount.auth.restorePassword;
    this.restorePassword.group = 'auth';
    this.commands.push(this.restorePassword);

    this.logout = new BaseCommand('logout');
    this.logout.label = localizationAccount.auth.logout;
    this.logout.group = 'auth';
    this.commands.push(this.logout);

    CommandService.addCommands(this.commands);
  }
}

/**
 * Глобальный доступ к командам связанным с авторизацией и регистрацией пользователя 
 */
export const AuthCommands = AuthCommandsClass.Instance;