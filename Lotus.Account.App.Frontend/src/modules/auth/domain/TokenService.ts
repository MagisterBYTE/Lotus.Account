import { jwtDecode, type JwtPayload } from "jwt-decode";
import type { ISuccessAuthResponse, ITokenExpiryDetails, ITokenExpiryFormattedInfo } from "../domain/type";
import { TokenItemEnum } from "../domain/type/TokenItem";
import type { IStorage } from "lotus-core/types";
import { Assert } from "lotus-core/utils";
import { DateTimeFormatter } from "lotus-core/formatters";

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

    if (!accessToken || expiresIn <= currentTime)
    {
      return {
        isExpired: true,
        expiryDate: undefined,
        remainingSeconds: 0,
        formatted: {
          short: "Токен истек",
          medium: "Токен истек. Требуется обновление",
          full: "Срок действия токена истек. Необходимо повторно войти в систему",
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
      remainingTime: DateTimeFormatter.formatRelative(remainingSeconds),
      formatted: formatted,
    };
  }

  /**
   * Форматирует информацию об истечении токена
   */
  private formatExpiryInfo(expiryDate: Date, remainingSeconds: number): ITokenExpiryFormattedInfo
  {
    const formattedDate = DateTimeFormatter.date(expiryDate);
    const remainingTime = DateTimeFormatter.formatDuration(remainingSeconds);
    const timeAgo = DateTimeFormatter.formatRelativeOfDate(expiryDate);

    return {
      short: `Действителен до: ${formattedDate}`,
      medium: `Истекает: ${formattedDate} (${remainingTime})`,
      full: `Токен действителен до ${formattedDate}. Осталось: ${remainingTime}. Истечет ${timeAgo}.`,
    };
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

    const userId = tokenItems.sub;
    this.storage.setItem(TokenItemEnum.UserId, userId);

    const userLogin = tokenItems.name;
    this.storage.setItem(TokenItemEnum.UserLogin, userLogin);

    const userUserRole = tokenItems.role;
    this.storage.setItem(TokenItemEnum.UserRole, userUserRole);

    const userName = tokenItems.user_name;
    this.storage.setItem(TokenItemEnum.UserName, userName);

    const userSurname = tokenItems.user_surname;
    this.storage.setItem(TokenItemEnum.UserSurname, userSurname);

    const userFathersname = tokenItems.user_fathersname;
    this.storage.setItem(TokenItemEnum.UserFathersname, userFathersname);

    const userUserPosition = tokenItems.user_position;
    this.storage.setItem(TokenItemEnum.UserPosition, userUserPosition);

    const userUserGroup = tokenItems.user_group;
    this.storage.setItem(TokenItemEnum.UserGroup, userUserGroup);

    const userUserPermissions = tokenItems.user_permissions;
    this.storage.setItem(TokenItemEnum.UserPermissions, userUserPermissions);
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

  public clearAccessToken()
  {
    this.storage.removeItem(TokenItemEnum.AccessToken);
    this.storage.removeItem(TokenItemEnum.ExpiresIn);
    this.storage.removeItem(TokenItemEnum.RefreshToken);
    this.storage.removeItem(TokenItemEnum.UserId);
    this.storage.removeItem(TokenItemEnum.UserLogin);
    this.storage.removeItem(TokenItemEnum.UserName);
    this.storage.removeItem(TokenItemEnum.UserSurname);
    this.storage.removeItem(TokenItemEnum.UserFathersname);
    this.storage.removeItem(TokenItemEnum.UserRole);
    this.storage.removeItem(TokenItemEnum.UserPosition);
    this.storage.removeItem(TokenItemEnum.UserGroup);
    this.storage.removeItem(TokenItemEnum.UserPermissions);
  }
  //#endregion

  //#region Get payload methods
  public getUserId(): string | null
  {
    return this.storage.getItem(TokenItemEnum.UserId);
  }

  public getUserLogin(): string | null
  {
    return this.storage.getItem(TokenItemEnum.UserLogin);
  }

  public getUserName(): string | null
  {
    return this.storage.getItem(TokenItemEnum.UserName);
  }

  public getUserSurname(): string | null
  {
    return this.storage.getItem(TokenItemEnum.UserSurname);
  }

  public getUserFathersName(): string | null
  {
    return this.storage.getItem(TokenItemEnum.UserFathersname);
  }

  public getCurrentUserFio(): string | null
  {
    return `${this.getUserSurname()} ${this.getUserName()} ${this.getUserFathersName()}`;
  }

  public getUserRole(): string | null
  {
    return this.storage.getItem(TokenItemEnum.UserRole);
  }

  public getUserPosition(): string | null
  {
    return this.storage.getItem(TokenItemEnum.UserPosition);
  }

  public getUserGroup(): string | null
  {
    return this.storage.getItem(TokenItemEnum.UserGroup);
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
    return true;
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
