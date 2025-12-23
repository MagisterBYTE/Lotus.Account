import { FunctionHelper } from "lotus-core/helpers";
import type { IRefreshProxy } from "lotus-core/modules/refreshProxy";
import { ValidationHelper } from "lotus-core/modules/validation";
import { Assert } from "lotus-core/utils";
import { AuthService } from "../AuthService";
import type { IRegisterParameters } from "./type";

export class RegisterParameters implements IRegisterParameters, IRefreshProxy
{
  //#region Fields
  //
  // ИДЕНТИФИКАЦИЯ
  //
  public login: string;
  public email: string;
  public password: string;

  public rememberMe: boolean;
  public term: boolean;

  public onRefreshProxy: () => void;
  //#endregion

  constructor()
  {
    this.login = ''
    this.email = ''
    this.password = ''

    this.rememberMe = false;
    this.term = false;

    this.onRefreshProxy = this.defaultRefreshProxy;

    FunctionHelper.bindAllMethods(this);
  }

  /**
 * Регистрация нового пользователя
 * @param registerParameters Параметры для регистрации нового пользователя
 */
  public async register()
  {
    await AuthService.registerAsync(this);
  }

  public defaultRefreshProxy()
  {

  }

  public setLogin(login: string, isRefreshProxy: boolean = false)
  {
    this.login = login;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setEmail(email: string, isRefreshProxy: boolean = false)
  {
    this.email = email;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setTerm(term: boolean, isRefreshProxy: boolean = false)
  {
    this.term = term;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setRememberMe(rememberMe: boolean, isRefreshProxy: boolean = false)
  {
    this.rememberMe = rememberMe;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public invalidLogin():string|undefined
  {
    if(this.login.length < 6)
    {
      return 'Длина пароля не может быть мень 6 символов'
    }

    return undefined;
  }

  public invalidEmail():string|undefined
  {
    if(ValidationHelper.isValidEmail(this.email))
    {
      return undefined;
    }

    return 'Некорректный Email';
  }

  public invalid():boolean
  {
    return Assert.existValue(this.invalidLogin()) || Assert.existValue(this.invalidEmail()) || !this.term;
  }
}
