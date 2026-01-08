import { IconLogout } from '@tabler/icons-react';
import { FunctionHelper } from 'lotus-core/helpers';
import { LanguageChangeEventType, type LanguageChangeEvent } from 'lotus-core/localization';
import { ActionCommand, CommandActionService, NavigationCommand } from 'lotus-core/modules/actionCommand';
import { RoutesAccount } from '#app';
import { LocalizationAccount } from '#localization';
import { AuthService } from './AuthService';

class AuthCommandsClass extends CommandActionService
{
  // #region Static fields
  private static _authCommands: AuthCommandsClass;

  public static get Instance(): AuthCommandsClass
  {
    return this._authCommands || (this._authCommands = new this());
  }
  // #endregion

  // #region Fields
  /**
   * Вход на сайт по логину и паролю
   */
  login: NavigationCommand;

  /**
   * Зарегистрироваться
   */
  register: NavigationCommand;

  /**
   * Восстановить пароль
   */
  restorePassword: NavigationCommand;

  /**
   * Выход
   */
  logout: ActionCommand;
  // #endregion

  constructor()
  {
    super();

    this.login = new NavigationCommand('login', RoutesAccount.login);
    this.login.label = LocalizationAccount.data.auth.entrance;
    this.login.group = 'auth';
    this.commands.push(this.login);

    this.register = new NavigationCommand('register', RoutesAccount.register);
    this.register.label = LocalizationAccount.data.auth.register;
    this.register.group = 'auth';
    this.commands.push(this.register);

    this.restorePassword = new NavigationCommand('restorePassword', RoutesAccount.restorePassword);
    this.restorePassword.label = LocalizationAccount.data.auth.restorePassword;
    this.restorePassword.group = 'auth';
    this.commands.push(this.restorePassword);

    this.logout = new ActionCommand('logout');
    this.logout.label = LocalizationAccount.data.auth.logout;
    this.logout.icon = <IconLogout />;
    this.logout.group = 'auth';
    this.logout.execute = () =>
    {
      void AuthService.logoutAsync();
    };
    this.commands.push(this.logout);

    FunctionHelper.bindAllMethods(this);

    window.addEventListener(LanguageChangeEventType, (e) => this.onTranslate(e));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public onTranslate(_event: LanguageChangeEvent | any)
  {
    this.login.label = LocalizationAccount.data.auth.entrance;
    this.register.label = LocalizationAccount.data.auth.register;
    this.restorePassword.label = LocalizationAccount.data.auth.restorePassword;
    this.logout.label = LocalizationAccount.data.auth.logout;
  }
}

/**
 * Глобальный доступ к командам по авторизации и регистрации пользователя
 */
export const AuthCommands = AuthCommandsClass.Instance;