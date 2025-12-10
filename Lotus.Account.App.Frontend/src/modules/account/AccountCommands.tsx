import { ActionCommand, CommandActionService, NavigationCommand } from "lotus-core";
import { LocalizationAccount } from "#localization";
import { RoutesAccount } from "#app";
import { IconSettings, IconUserScan, IconUserShield } from "@tabler/icons-react";
import { LanguageChangeEventType, type LanguageChangeEvent } from "lotus-core/localization";
import { FunctionHelper } from "lotus-core/helpers";

class AccountCommandsClass extends CommandActionService
{
  // #region Static fields
  private static _accountCommands: AccountCommandsClass;

  public static get Instance(): AccountCommandsClass
  {
    return this._accountCommands || (this._accountCommands = new this());
  }
  //#endregion

  // #region Fields
  account: ActionCommand;
  profile: NavigationCommand;
  settings: NavigationCommand;
  security: NavigationCommand;
  // #endregion

  constructor()
  {
    super();

    this.account = new ActionCommand("account");
    this.account.label = LocalizationAccount.data.auth.account;
    this.account.group = "account";
    this.commands.push(this.account);

    this.profile = new NavigationCommand("profile", RoutesAccount.accountProfile);
    this.profile.label = LocalizationAccount.data.account.profile;
    this.profile.icon = <IconUserScan />;
    this.profile.group = "account";
    this.commands.push(this.profile);

    this.settings = new NavigationCommand("settings", RoutesAccount.accountSettings);
    this.settings.label = LocalizationAccount.data.account.settings;
    this.settings.icon = <IconSettings />;
    this.settings.group = "account";
    this.commands.push(this.settings);

    this.security = new NavigationCommand("security", RoutesAccount.accountSecurity);
    this.security.label = LocalizationAccount.data.account.security;
    this.security.icon = <IconUserShield />;
    this.security.group = "account";
    this.commands.push(this.security);

    FunctionHelper.bindAllMethods(this);

    window.addEventListener(LanguageChangeEventType, (e) => this.onTranslate(e));
  }

  public onTranslate(event: LanguageChangeEvent | any)
  {
    this.account.label = LocalizationAccount.data.auth.account;
    this.profile.label = LocalizationAccount.data.account.profile;
    this.settings.label = LocalizationAccount.data.account.settings;
    this.security.label = LocalizationAccount.data.account.security;
  }
}


/**
 * Глобальный доступ к командам аккаунта пользователя
 */
export const AccountCommands = AccountCommandsClass.Instance;