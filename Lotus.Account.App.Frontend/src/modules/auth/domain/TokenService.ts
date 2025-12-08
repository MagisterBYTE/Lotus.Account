import { jwtDecode, type JwtPayload } from "jwt-decode";
import type { ISuccessAuthResponse } from "../domain/type";
import { TokenItemEnum } from "../domain/type/TokenItem";
import type { IStorage } from "lotus-core/types";
import { Assert } from "lotus-core/utils";

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
