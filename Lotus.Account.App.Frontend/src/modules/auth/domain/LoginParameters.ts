import { FunctionHelper } from "lotus-core/helpers";
import { AuthService } from "../AuthService";
import type { ILoginParameters } from "./type";
import { RefreshProxy } from "lotus-core/modules/refreshProxy";
import { ValidationResult } from "lotus-core/modules/validation";

export class LoginParameters extends RefreshProxy implements ILoginParameters {
  //#region Fields
  public login: string;
  public password: string;
  public rememberMe: boolean;

  public hasInputLogin: boolean;
  public hasInputPassword: boolean;
  public validationStatus: ValidationResult;
  //#endregion

  constructor() {
    super();
    this.login = "";
    this.password = "";
    this.rememberMe = false;
    this.hasInputLogin = false;
    this.hasInputPassword = false;
    this.validationStatus = new ValidationResult();
    FunctionHelper.bindAllMethods(this);
  }

  public setLogin(login: string, isRefreshProxy: boolean = false) {
    this.login = login;
    this.hasInputLogin = true;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setPassword(password: string, isRefreshProxy: boolean = false) {
    this.password = password;
    this.hasInputPassword = true;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public setRememberMe(rememberMe: boolean, isRefreshProxy: boolean = false) {
    this.rememberMe = rememberMe;
    if (isRefreshProxy) this.onRefreshProxy();
  }

  public validation(): boolean {
    this.validationStatus.clear();
    if(this.hasInputLogin) this.validationStatus.addErrorRequired('login', this.login);
    if(this.hasInputPassword) this.validationStatus.addErrorRequired('password', this.password);
    return this.validationStatus.isValid() && this.hasInputLogin && this.hasInputPassword;
  }
}
