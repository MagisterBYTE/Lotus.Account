import { CookiesHelper, FunctionHelper } from "lotus-core";
import { castToSuccessAuthResponse, type IRegisterParameters } from "./domain";
import { TokenService } from "./domain/TokenService";
import { AuthApiService } from "./domain/api";

class AuthServiceClass
{
  //#region Static fields
  private static _authService: AuthServiceClass;

  public static get Instance(): AuthServiceClass
  {
    return this._authService || (this._authService = new this());
  }
  //#endregion

  //#region Fields
  public tokenService: TokenService;
  public authApiService: AuthApiService;
  //#endregion

  //#region Properties
  public get isAuth()
  {
    return this.tokenService.hasAccessToken();
  }
  //#endregion

  constructor()
  {
    this.tokenService = new TokenService(window.localStorage);
    this.authApiService = new AuthApiService(this.tokenService);
    FunctionHelper.bindAllMethods(this);
  }

  /**
   * Вход через пароль и логин
   * @param login Логин
   * @param password Пароль
   * @param rememberMe Запомнить
   * @param redirectUrl URL-адрес перенаправления в случае успешного входа
   * @returns
   */
  public async login(login: string, password: string, rememberMe?: boolean, redirectUrl?: string)
  {
    const response = await this.authApiService.loginAsync(login, password);
    if (response)
    {
      const data = castToSuccessAuthResponse(response.data);
      if (data)
      {
        this.tokenService.setData(data);

        if (rememberMe)
        {
          this.setAuthCookie(login, password);
        }

        if (redirectUrl)
        {
          location.assign(redirectUrl);
        }
      }
    }
  }

  /**
   * Регистрация нового пользователя
   * @param registerParameters Параметры для регистрации нового пользователя
   * @param redirectUrl URL-адрес перенаправления в случае успешной регистрации
   */
  public async register(registerParameters: IRegisterParameters, redirectUrl?: string)
  {
    await this.authApiService.registerAsync(registerParameters);
    if (redirectUrl)
    {
      location.assign(redirectUrl);
    }
  }

  /**
   * Выход из сайта
   */
  public async logout()
  {
    try
    {
      await this.authApiService.logoutAsync();
    }
    catch (error)
    {
      console.error(error);
    }

    // Удаляем все куки
    CookiesHelper.deleteAll();

    // Очищаем
    this.tokenService.clearAccessToken();

    location.assign("/");
  }

  /**
   * Установить куки для автоматического входа на сайт
   * @param login Логин
   * @param password Пароль
   */
  public setAuthCookie(login: string, password: string)
  {
    this.authApiService.setAuthCookie(login, password);
  }

  /**
   * Проверка куки для автоматического входа на сайт
   * @returns
   */
  public hasAuthCookie(): boolean
  {
    return this.authApiService.hasAuthCookie();
  }

  /**
   * Автоматического входа на сайт используя куку
   * @param redirectUrl URL-адрес перенаправления в случае успешного входа
   * @returns
   */
  public loginAuthCookie(redirectUrl?: string)
  {
    this.authApiService.loginAuthCookie(redirectUrl);
  }
}

/**
 * Глобальный доступ к сервису по авторизации и регистрации пользователя
 */
export const AuthService = AuthServiceClass.Instance;
