import axios, { type InternalAxiosRequestConfig } from "axios";
import { CookiesHelper, FunctionHelper } from "lotus-core";
import { AppApiService } from "#app";
import { castToSuccessAuthResponse, type IRegisterParameters } from "../type";
import type { TokenService } from "../TokenService";

/**
 * Класс для сервисов Api с поддержкой авторизации
 */
export class AuthApiService extends AppApiService
{
  //#region Static fields
  /**
   * Дельта времени истечения срока действия токена, в секундах
   */
  private static RefreshTokenDelta: number = 10;

  /**
   * Имя куки для автоматического входа на сайт
   */
  private static AuthCookieName: string = "lotus-account-app-frontend";

  /**
   * Разделить для формирования хэшируемой строки авто доступа
   */
  private static DelimiterHash: string = "(!=====!)";

  /**
   * Маршруты для которых не требуется авторизации
   */
  protected static RouteNotAuth: string[] = [];
  //#endregion

  //#region Fields
  public tokenService: TokenService;
  //#endregion

  constructor(tokenService: TokenService)
  {
    super();

    this.tokenService = tokenService;

    AuthApiService.RouteNotAuth.push("connect/token");
    AuthApiService.RouteNotAuth.push("connect/logout");
    AuthApiService.RouteNotAuth.push("api/Authorize/Register");

    FunctionHelper.bindAllMethods(this, ["api"]);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected override async handleRequest(config: InternalAxiosRequestConfig<any>): Promise<InternalAxiosRequestConfig<any>>
  {
    // Смотрим нужно ли добавлять заголовок для авторизации
    const isAddToken = AuthApiService.RouteNotAuth.includes(config.url ?? "") === false;

    if (isAddToken)
    {
      // Получаем текущее время и время устаревания токена
      const expTime = this.tokenService.getExpiresIn();
      const curTime = new Date().getTime() / 1000;

      // Сравниваем, если разница более 10 секунд - запускаем процедуру получения нового токена из refresh_token
      const delta = curTime - expTime;
      if (delta <= AuthApiService.RefreshTokenDelta)
      {
        try
        {
          const response = await this.refreshTokenAsync();
          if (response)
          {
            const data = castToSuccessAuthResponse(response.data);
            if (data)
            {
              this.tokenService.setData(data);
            }
          }
        } catch (error)
        {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          this.tokenService.clearAccessToken();
          window.location.reload();
        }
      }

      // Токен протух
      if (curTime > expTime)
      {
        // Если есть возможность то автоматически входим на сайт
        if (this.hasAuthCookie())
        {
          this.loginAuthCookie();
        } else
        {
          this.tokenService.clearAccessToken();
          window.location.reload();
        }
      } else
      {
        const accessToken = this.tokenService.getAccessToken();

        if (accessToken)
        {
          const headerNameAuth = "Authorization";
          const headerNameValue = `Bearer ${accessToken}`;

          config.headers.set(headerNameAuth, headerNameValue);
          config.withCredentials = false;
        }
      }
    }

    config.timeout = 10 * 60 * 1000;
    config.cancelToken = axios.CancelToken.source().token;

    return config;
  }

  /**
   * Вход через пароль и логин
   * @param login Логин
   * @param password Пароль
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async loginAsync(login: string, password: string): Promise<any>
  {
    const url = "connect/token";

    const data = new URLSearchParams({
      username: login,
      password: password,
      grant_type: "password",
      scope: "offline_access",
    });

    const config = this.getConfigAcceptJson();

    const response = await this.api.post(url, data, config);
    return response;
  }

  /**
   * Обновление токена
   * @returns
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async refreshTokenAsync(): Promise<any>
  {
    const url = "connect/token";

    const data = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: this.tokenService.getRefreshToken()!,
      scope: "offline_access",
    });

    const config = this.getConfigAcceptJson();

    const response = await this.api.post(url, data, config);
    return response;
  }

  /**
   * Выход из сайта
   */
  public async logoutAsync()
  {
    const url = "connect/logout";

    const config = this.getConfigAcceptJson();

    await this.api.post(url, null, config);
  }

  /**
   * Регистрация нового пользователя
   * @param registerParameters Параметры для регистрации нового пользователя
   */
  public async registerAsync(registerParameters: IRegisterParameters)
  {
    const url = "api/Authorize/Register";
    await this.post(url, registerParameters);
  }

  /**
   * Установить куки для автоматического входа на сайт
   * @param login Логин
   * @param password Пароль
   */
  public setAuthCookie(login: string, password: string)
  {
    const value = login + AuthApiService.DelimiterHash + password;

    // Самое простое шифрование
    const hash = window.btoa(value);

    // Установим на 7 дней
    const date: Date = new Date();
    date.setDate(date.getDate() + 7);

    CookiesHelper.set(AuthApiService.AuthCookieName, hash, false, { expires: date });
  }

  /**
   * Проверка куки для автоматического входа на сайт
   * @returns
   */
  public hasAuthCookie(): boolean
  {
    const cook = CookiesHelper.get(AuthApiService.AuthCookieName);
    return cook !== undefined;
  }

  /**
   * Автоматического входа на сайт используя куку
   * @param redirectUrl URL-адрес перенаправления в случае успешного входа
   * @returns
   */
  public loginAuthCookie(redirectUrl?: string)
  {
    const hash = CookiesHelper.get(AuthApiService.AuthCookieName)!;
    const value = window.atob(hash);

    const index = value.indexOf(AuthApiService.DelimiterHash);
    const login = value.substring(0, index);
    const password = value.substring(index + AuthApiService.DelimiterHash.length);

    console.log(`login = ${login}`);
    console.log(`password = ${password}`);

    const responseWait = this.loginAsync(login, password);
    responseWait.then((response) =>
    {
      if (response)
      {
        const data = castToSuccessAuthResponse(response.data);
        if (data)
        {
          this.tokenService.setData(data);

          if (redirectUrl)
          {
            location.assign(redirectUrl);
          }
        }
      }
    });
  }
}
