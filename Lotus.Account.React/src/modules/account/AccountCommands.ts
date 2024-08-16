import { BaseCommand, CommandService, CommandServiceClass, ICommand, NavigationCommand } from 'lotus-core-react';
import { routesAccount } from 'app/routes';
import { localizationAccount } from 'localization';

class AccountCommandsClass extends CommandServiceClass
{
  private static _AccountCommands: AccountCommandsClass;

  public static override get Instance(): AccountCommandsClass 
  {
    return (this._AccountCommands || (this._AccountCommands = new this()));
  }

  // #region СВОЙСТВА
  /**
   * Аккаунт
   */
  account: ICommand;

  /**
   * Профиль
   */
  profile: ICommand;

  /**
   * Настройки
   */
  settings: ICommand;

  /**
   * Уведомления
   */
  notification: ICommand;
  // #endregion 

  constructor() 
  {
    super();

    this.account = new BaseCommand('account');
    this.account.label = 'Аккаунт';
    this.account.group = 'account';
    this.commands.push(this.account);

    this.profile = new NavigationCommand('userProfile', routesAccount.userProfile);
    this.profile.label = localizationAccount.profile.profile;
    this.profile.group = 'account';
    this.commands.push(this.profile);

    this.settings = new NavigationCommand('userSettings', routesAccount.userSettings);
    this.settings.label = localizationAccount.settings.settings;
    this.settings.group = 'account';
    this.commands.push(this.settings);

    this.notification = new NavigationCommand('userNotifications', routesAccount.userNotifications);
    this.notification.label = localizationAccount.notification.notification;
    this.notification.group = 'account';
    this.commands.push(this.notification);

    CommandService.addCommands(this.commands);
  }
}

/**
 * Глобальный доступ к командам связанным с аккаунтом пользователя 
 */
export const AccountCommands = AccountCommandsClass.Instance;
