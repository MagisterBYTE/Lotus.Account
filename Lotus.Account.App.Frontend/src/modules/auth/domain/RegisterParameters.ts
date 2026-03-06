import { RefreshProxy } from 'lotus-core/modules/refreshProxy';
import { ValidationResult, type IValidateObject } from 'lotus-core/modules/validation';
import { AuthService } from '../AuthService';
import type { IRegisterParameters } from './type';

export class RegisterParameters extends RefreshProxy implements IRegisterParameters, IValidateObject 
{
  // #region Fields
  public login: string;
  public email: string;
  public password: string;

  public rememberMe: boolean;
  public term: boolean;

  public hasInputLogin: boolean;
  public hasInputEmail: boolean;
  public hasInputPassword: boolean;
  public validationStatus: ValidationResult;
  // #endregion

  constructor() 
  {
    super();
    this.login = '';
    this.email = '';
    this.password = '';

    this.rememberMe = false;
    this.term = false;
    this.hasInputLogin = false;
    this.hasInputEmail = false;
    this.hasInputPassword = false;
    this.validationStatus = new ValidationResult();
  }

  /**
   * Регистрация нового пользователя
   * @param registerParameters Параметры для регистрации нового пользователя
   */
  public async register() 
  {
    await AuthService.registerAsync(this);
  }


  // #region Update state
  public setLogin(login: string, isRefreshProxy: boolean = true) 
  {
    this.login = login;
    this.hasInputLogin = true;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setEmail(email: string, isRefreshProxy: boolean = true) 
  {
    this.email = email;
    this.hasInputEmail = true;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setTerm(term: boolean, isRefreshProxy: boolean = true) 
  {
    this.term = term;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setRememberMe(rememberMe: boolean, isRefreshProxy: boolean = false) 
  {
    this.rememberMe = rememberMe;
    if (isRefreshProxy) this.onRefreshProxy();
  }
  // #endregion

  // #region IValidateObject
  public validate(): boolean 
  {
    this.validationStatus.clear();
    if (this.hasInputLogin) this.validationStatus.addErrorRequired('login', this.login);
    if (this.hasInputPassword) this.validationStatus.addErrorRequired('password', this.password);
    if (this.hasInputPassword) this.validationStatus.addErrorMinNumber('password', this.password.length, 6);
    if (this.hasInputEmail) this.validationStatus.addErrorEmail('email', this.email);
    return this.validationStatus.isValid() && this.hasInputLogin && this.hasInputPassword && this.hasInputEmail;
  }
  // #endregion
}
