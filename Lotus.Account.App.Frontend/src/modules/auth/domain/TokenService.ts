import { jwtDecode, type JwtPayload } from "jwt-decode";
import type { ISuccessAuthResponse, ITokenExpiryDetails, ITokenExpiryFormattedInfo } from "../domain/type";
import { TokenItemEnum } from "../domain/type/TokenItem";
import type { IStorage } from "lotus-core/types";
import { Assert } from "lotus-core/utils";
import { DateTimeFormatter } from "lotus-core/formatters";
import { LocalizationAccount, LocalizationAccountDispatcher } from "#localization";
import { StringHelper } from "lotus-core/helpers";

/**
 * Сервис для работы с токенами
 */
export class TokenService
{
  //#region Fields
  public storage: IStorage;
  //#endregion

  constructor(storage: IStorage)
  {
    this.storage = storage;
  }
  //#region Expiry methods
  /**
   * Проверяет наличие валидного access токена
   * Включает проверку срока действия
   *
   * @returns true если токен существует и не истек
   */
  public hasValidAccessToken(): boolean
  {
    const accessToken = this.getAccessToken();
    if (!accessToken)
    {
      return false;
    }

    // Проверяем срок действия токена
    const expiresIn = this.getExpiresIn();
    const currentTime = Math.floor(Date.now() / 1000);

    // Добавляем буфер 60 секунд для учета задержек сети
    const isExpired = currentTime + 60 >= expiresIn;

    return !isExpired;
  }

  /**
   * Проверяет возможность обновления токена
   * (наличие валидного refresh токена)
   *
   * @returns true если можно обновить access токен
   */
  public canRefreshToken(): boolean
  {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken)
    {
      return false;
    }

    // Проверяем, что refresh токен еще действителен
    // Обычно refresh токены живут дольше, но можно добавить проверку
    const refreshTokenExpiry = this.getExpiresIn() * 4; // По умолчанию в 4 раза дольше
    if (refreshTokenExpiry)
    {
      const currentTime = Math.floor(Date.now() / 1000);
      return currentTime + 300 < refreshTokenExpiry; // 5 минут буфера
    }

    return true;
  }

  /**
   * Проверяет, истекает ли токен в ближайшее время
   * (для предупреждения пользователя или автоматического обновления)
   *
   * @param thresholdSeconds Пороговое значение в секундах (по умолчанию 300 = 5 минут)
   * @returns true если токен истекает в течение указанного времени
   */
  public isTokenExpiringSoon(thresholdSeconds: number = 300): boolean
  {
    if (!this.hasValidAccessToken())
    {
      return false;
    }

    const expiresIn = this.getExpiresIn();
    const currentTime = Math.floor(Date.now() / 1000);

    return expiresIn - currentTime <= thresholdSeconds;
  }

  /**
   * Возвращает детальную информацию о времени истечения токена
   *
   * @returns Объект с разными форматами времени истечения
   */
  public getTokenExpiryDetails(): ITokenExpiryDetails
  {
    const accessToken = this.getAccessToken();
    const expiresIn = this.getExpiresIn();
    const currentTime = Math.floor(Date.now() / 1000);
    const lang = LocalizationAccountDispatcher.currentLanguage;

    if (!accessToken || expiresIn <= currentTime)
    {
      return {
        isExpired: true,
        expiryDate: undefined,
        remainingSeconds: 0,
        formatted: {
          short: LocalizationAccount.data.token.expiredShort,
          medium: LocalizationAccount.data.token.expiredMedium,
          full: LocalizationAccount.data.token.expiredFull,
        },
      };
    }

    const remainingSeconds = expiresIn - currentTime;
    const expiryDate = new Date(expiresIn * 1000);

    const formatted = this.formatExpiryInfo(expiryDate, remainingSeconds);

    return {
      isExpired: false,
      expiryDate: expiryDate,
      remainingSeconds: remainingSeconds,
      remainingTime: DateTimeFormatter.formatRelative(remainingSeconds, lang),
      formatted: formatted,
    };
  }

  /**
   * Форматирует информацию об истечении токена
   */
  private formatExpiryInfo(expiryDate: Date, remainingSeconds: number): ITokenExpiryFormattedInfo
  {
    const lang = LocalizationAccountDispatcher.currentLanguage;
    const formattedDate = DateTimeFormatter.date(expiryDate, lang);
    const remainingTime = DateTimeFormatter.formatDuration(remainingSeconds, lang);
    const timeAgo = DateTimeFormatter.formatRelativeOfDate(expiryDate, lang);

    const short = StringHelper.stringFormat(LocalizationAccount.data.token.validShort, formattedDate);
    const medium = StringHelper.stringFormat(LocalizationAccount.data.token.validMedium, formattedDate, remainingTime);
    const full = StringHelper.stringFormat(LocalizationAccount.data.token.validFull, formattedDate, remainingTime, timeAgo);
    return { short, medium, full };
  }
  //#endregion

  //#region Token methods
  public setData(data: ISuccessAuthResponse)
  {
    this.storage.setItem(TokenItemEnum.AccessToken, data.access_token);
    this.storage.setItem(TokenItemEnum.RefreshToken, data.refresh_token);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokenItems = jwtDecode<JwtPayload>(data.access_token) as any;

    const expToken = tokenItems.exp;
    this.storage.setItem(TokenItemEnum.ExpiresIn, expToken);

    const userLogin = tokenItems.name;
    this.storage.setItem(TokenItemEnum.Login, userLogin);

    const userRole = tokenItems.role;
    this.storage.setItem(TokenItemEnum.Role, userRole);

    const userEmail = tokenItems.email;
    this.storage.setItem(TokenItemEnum.Email, userEmail); 

    const userName = tokenItems.user_name;
    this.storage.setItem(TokenItemEnum.UserName, userName);

    const userPermissions = tokenItems.user_permissions;
    this.storage.setItem(TokenItemEnum.UserPermissions, userPermissions);
  }

  public getAccessToken(): string | null
  {
    return this.storage.getItem(TokenItemEnum.AccessToken);
  }

  public getRefreshToken(): string | null
  {
    return this.storage.getItem(TokenItemEnum.RefreshToken);
  }

  public getExpiresIn(): number
  {
    return Number(this.storage.getItem(TokenItemEnum.ExpiresIn));
  }

  public hasAccessToken(): boolean
  {
    const token = this.storage.getItem(TokenItemEnum.AccessToken);
    if (token)
    {
      return true;
    }

    return false;
  }

  public clearData()
  {
    this.storage.removeItem(TokenItemEnum.AccessToken);
    this.storage.removeItem(TokenItemEnum.ExpiresIn);
    this.storage.removeItem(TokenItemEnum.RefreshToken);
    this.storage.removeItem(TokenItemEnum.Login);
    this.storage.removeItem(TokenItemEnum.Role);
    this.storage.removeItem(TokenItemEnum.Email);
    this.storage.removeItem(TokenItemEnum.UserName);
    this.storage.removeItem(TokenItemEnum.UserPermissions);
  }
  //#endregion

  //#region Get payload methods
  public getLogin(): string | null
  {
    return this.storage.getItem(TokenItemEnum.Login);
  }

  public getRole(): string | null
  {
    return this.storage.getItem(TokenItemEnum.Role);
  }

  public getEmail(): string | null
  {
    return this.storage.getItem(TokenItemEnum.Email);
  }

  public getUserName(): string | null
  {
    return this.storage.getItem(TokenItemEnum.UserName);
  }

  public getUserPermissions(): string | null
  {
    return this.storage.getItem(TokenItemEnum.UserPermissions);
  }
  //#endregion

  //#region Permission methods
  public checkUserPermission(permission: string): boolean
  {
    const accessUserPermissions = this.storage.getItem(TokenItemEnum.UserPermissions);
    if (Assert.existValue<string>(accessUserPermissions))
    {
      return accessUserPermissions.includes(permission);
    }
    return false;
  }

  public checkUserPermissions(permissions: string[] | undefined): boolean
  {
    if (permissions === undefined) return true;

    const accessUserPermissions = this.storage.getItem(TokenItemEnum.UserPermissions);
    if (Assert.existValue<string>(accessUserPermissions))
    {
      for (const element of permissions!)
      {
        const permission = element!;
        const exist = accessUserPermissions!.includes(permission);
        if (exist)
        {
          return true;
        }
      }
    }
    return false;
  }
  //#endregion
}
