import { type AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import { AppApiService } from "#app";
import { castToSuccessAuthResponse, type IRegisterParameters, type ISuccessAuthResponse } from "../type";
import type { TokenService } from "../TokenService";
import { FunctionHelper, CookiesHelper } from "lotus-core/helpers";

export interface IRememberData
{
  login: string;
  userId: string;
  timestamp: number;
}

/**
 * Класс для сервисов Api с поддержкой авторизации
 */
export class AuthApiService extends AppApiService
{
  //#region Static fields
  /**
   * Количество дней для хранения информации о входе
   */
  private static readonly RememberDays: number = 7; // 5 минут в секундах

  /**
   * Дельта времени истечения срока действия токена, в секундах
   */
  private static readonly RefreshTokenDelta: number = 300; // 5 минут в секундах

  /**
   * Имя куки для автоматического входа на сайт
   */
  private static readonly AuthCookieName: string = "lotus-account-app-frontend";

  /**
   * Разделить для формирования хэшируемой строки авто доступа
   */
  private static readonly DelimiterHash: string = "(!=====!)";

  /**
   * Маршруты для которых не требуется авторизации
   */
  private static readonly RouteNotAuth: ReadonlyArray<string> = ["connect/token", "connect/logout", "api/Authorize/Register"];

  private static isRefreshing = false;
  //#endregion

  //#region Fields
  private readonly tokenService: TokenService;
  private readonly pendingRequests: Array<{
    resolve: (token: string) => void;
    reject: (error: unknown) => void;
  }> = [];
  //#endregion

  constructor(tokenService: TokenService)
  {
    super();
    this.tokenService = tokenService;
    FunctionHelper.bindAllMethods(this, ["api"]);
  }

  protected override async handleRequest(config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig>
  {
    // Проверяем, требуется ли авторизация для этого маршрута
    const requiresAuth = !this.isRouteExcluded(config.url);

    if (!requiresAuth)
    {
      return this.setRequestConfig(config, false);
    }

    // Проверяем срок действия токена
    const isTokenValid = await this.checkAndRefreshToken();

    if (!isTokenValid)
    {
      throw new Error("Authentication required");
    }

    // Добавляем токен в заголовок
    const accessToken = this.tokenService.getAccessToken();
    if (accessToken)
    {
      return this.setRequestConfig(config, true, accessToken);
    }

    return this.setRequestConfig(config, false);
  }

  /**
   * Проверяет и обновляет токен при необходимости
   */
  private async checkAndRefreshToken(): Promise<boolean>
  {
    const accessToken = this.tokenService.getAccessToken();
    const refreshToken = this.tokenService.getRefreshToken();

    if (!accessToken || !refreshToken)
    {
      return false;
    }

    // Проверяем срок действия access token
    const expiresIn = this.tokenService.getExpiresIn();
    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilExpiry = expiresIn - currentTime;

    // Если токен истекает через менее 5 минут, обновляем
    if (timeUntilExpiry < AuthApiService.RefreshTokenDelta)
    {
      try
      {
        const newTokens = await this.refreshTokenSafely();
        return !!newTokens;
      } catch (error)
      {
        this.handleAuthError(error);
        return false;
      }
    }

    return true;
  }

  /**
   * Безопасное обновление токена с защитой от конкурентных запросов
   */
  private async refreshTokenSafely(): Promise<ISuccessAuthResponse | null>
  {
    // Если уже идет обновление, ждем его завершения
    if (AuthApiService.isRefreshing)
    {
      return new Promise((resolve, reject) =>
      {
        this.pendingRequests.push({ resolve, reject });
      }).then(() =>
      {
        const token = this.tokenService.getAccessToken();
        return token ? ({ access_token: token } as ISuccessAuthResponse) : null;
      });
    }

    AuthApiService.isRefreshing = true;

    try
    {
      const response = await this.refreshTokenAsync();
      const data = castToSuccessAuthResponse(response.data);

      if (data)
      {
        this.tokenService.setData(data);

        // Разрешаем все ожидающие запросы
        this.pendingRequests.forEach((request) => request.resolve(data.access_token));
        this.pendingRequests.length = 0;

        return data;
      }
      return null;
    } catch (error)
    {
      // Отклоняем все ожидающие запросы
      this.pendingRequests.forEach((request) => request.reject(error));
      this.pendingRequests.length = 0;

      throw error;
    } finally
    {
      AuthApiService.isRefreshing = false;
    }
  }

  /**
   * Настройка конфигурации запроса
   */
  private setRequestConfig(config: InternalAxiosRequestConfig, includeAuth: boolean, accessToken?: string): InternalAxiosRequestConfig
  {
    const newConfig: InternalAxiosRequestConfig = { ...config };

    if (includeAuth && accessToken)
    {
      newConfig.headers.setAuthorization(`Bearer ${accessToken}`, true);
    }

    // Настраиваем таймаут и другие параметры
    newConfig.timeout = 10 * 60 * 1000; // 10 минут

    // Используем общий источник отмены, если нужно
    // newConfig.cancelToken = this.cancelTokenSource.token;

    return newConfig;
  }

  /**
   * Проверяет, исключен ли маршрут из авторизации
   */
  private isRouteExcluded(url?: string): boolean
  {
    if (!url) return false;
    return AuthApiService.RouteNotAuth.some((route) => url.includes(route) || url.endsWith(route));
  }

  /**
   * Обработка ошибок аутентификации
   */
  private handleAuthError(error: unknown): void
  {
    console.error("Authentication error:", error);

    // Очищаем токены
    this.tokenService.clearAccessToken();

    // Проверяем возможность автоматического входа (безопасно)
    if (this.hasSecureAuthCookie())
    {
      this.loginWithSecureCookie();
    } else
    {
      // Перенаправляем на страницу логина
      this.redirectToLogin();
    }
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
   * Вход через пароль и логин
   */
  public async loginAsync(login: string, password: string): Promise<ISuccessAuthResponse>
  {
    const url = "connect/token";

    const data = new URLSearchParams({
      username: login,
      password: password,
      grant_type: "password",
      scope: "offline_access",
    });

    const config = this.getConfigAcceptJson();

    const response = await this.api.post<ISuccessAuthResponse>(url, data, config);
    return response.data;
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
   * Обновление токена
   */
  public async refreshTokenAsync(): Promise<AxiosResponse<ISuccessAuthResponse>>
  {
    const refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken)
    {
      throw new Error("No refresh token available");
    }

    const url = "connect/token";
    const data = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      scope: "offline_access",
    });

    const config = this.getConfigAcceptJson();
    return this.api.post<ISuccessAuthResponse>(url, data, config);
  }

  /**
   * Безопасное хранение информации для "запомнить меня"
   */
  public setSecureRememberMe(login: string, userId: string): void
  {
    // Используем безопасные, зашифрованные куки или localStorage
    const rememberData: IRememberData = {
      login,
      userId,
      timestamp: Date.now(),
    };

    // В реальном приложении используйте библиотеку для шифрования
    const encryptedData = this.encryptData(JSON.stringify(rememberData));

    CookiesHelper.set(AuthApiService.AuthCookieName, encryptedData, {
      expires: new Date(Date.now() + AuthApiService.RememberDays * 24 * 60 * 60 * 1000), // 7 дней
      secure: true,
      sameSite: "strict",
      path: "/",
    });
  }

  /**
   * Проверка наличия безопасной куки
   */
  public hasSecureAuthCookie(): boolean
  {
    const cookie = CookiesHelper.get(AuthApiService.AuthCookieName);
    if (!cookie) return false;

    try
    {
      const data = this.getRememberMeData();
      if (!data) return false;

      // Проверяем срок действия
      const isExpired = Date.now() - data.timestamp > AuthApiService.RememberDays * 24 * 60 * 60 * 1000;

      // Дополнительная проверка целостности данных
      const isValid = Boolean(data.login && data.userId && data.timestamp);
      return !isExpired && isValid;
    } catch (error)
    {
      console.warn("Не удалось расшифровать или проверить remember me cookie:", error);
      this.clearRememberMeCookie(); // Очищаем поврежденную куку
      return false;
    }
  }

  /**
   * Получение данных из remember me cookie
   */
  private getRememberMeData(): IRememberData | undefined
  {
    const cookie = CookiesHelper.get(AuthApiService.AuthCookieName);
    if (!cookie) return undefined;

    try
    {
      const decrypted = this.decryptData(cookie);
      const data = JSON.parse(decrypted);

      // Проверяем наличие обязательных полей
      if (!data.login || !data.userId || !data.timestamp)
      {
        return undefined;
      }

      return data;
    } catch (error)
    {
      console.error("Ошибка при получении remember me данных:", error);
      this.clearRememberMeCookie(); // Очищаем поврежденную куку
      return undefined;
    }
  }

  /**
   * Очистка remember me cookie
   */
  private clearRememberMeCookie(): void
  {
    CookiesHelper.delete(AuthApiService.AuthCookieName, { path: "/" });

    // Также очищаем из secure storage
    try
    {
      localStorage.removeItem("secure_remember_me");
    } catch (error)
    {
      console.warn("Не удалось очистить secure storage:", error);
    }
  }

  /**
   * Безопасный вход через куку
   */
  private async loginWithSecureCookie(): Promise<void>
  {
    try
    {
      const data = this.getRememberMeData();
      if (!data) return;

      // Здесь должен быть вызов API для получения нового токена
      // по userId или другому безопасному идентификатору
      // НИКОГДА не храните пароли в куках!
    } catch (error)
    {
      console.error("Secure cookie login failed:", error);
      this.clearAuthCookies();
    }
  }

  /**
   * Очистка аутентификационных данных
   */
  private clearAuthCookies(): void
  {
    CookiesHelper.delete(AuthApiService.AuthCookieName);
    this.tokenService.clearAccessToken();
  }

  /**
   * Перенаправление на страницу логина
   */
  private redirectToLogin(): void
  {
    // Сохраняем текущий URL для возврата после логина
    const returnUrl = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `/login?returnUrl=${returnUrl}`;
  }

  // Вспомогательные методы шифрования (заглушки - реализуйте правильно!)
  private encryptData(data: string): string
  {
    // TODO: Реализовать настоящее шифрование (например, с использованием Web Crypto API)
    return btoa(encodeURIComponent(data));
  }

  private decryptData(encrypted: string): string
  {
    // TODO: Реализовать настоящее расшифрование
    return decodeURIComponent(atob(encrypted));
  }
}
