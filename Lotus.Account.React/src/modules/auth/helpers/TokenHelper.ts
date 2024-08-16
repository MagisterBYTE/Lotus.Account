import { jwtDecode, JwtPayload } from 'jwt-decode';
import { ISuccessAuthResponse } from '../domain/SuccessAuthResponse';
import { TokenItemEnum } from '../domain/TokenItem';

const storage = window.localStorage;

export class TokenHelper 
{
  public static setData(data: ISuccessAuthResponse) 
  {
    storage.setItem(TokenItemEnum.AccessToken, data.access_token);
    storage.setItem(TokenItemEnum.RefreshToken, data.refresh_token);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tokenItems = jwtDecode<JwtPayload>(data.access_token) as any;

    const expToken = tokenItems.exp;
    storage.setItem(TokenItemEnum.ExpiresIn, expToken);

    const userId = tokenItems.sub;
    storage.setItem(TokenItemEnum.UserId, userId);

    const userLogin = tokenItems.name;
    storage.setItem(TokenItemEnum.UserLogin, userLogin);

    const userUserRole = tokenItems.role;
    storage.setItem(TokenItemEnum.UserRole, userUserRole);

    const userName = tokenItems.user_name;
    storage.setItem(TokenItemEnum.UserName, userName);

    const userSurname = tokenItems.user_surname;
    storage.setItem(TokenItemEnum.UserSurname, userSurname);

    const userFathersname = tokenItems.user_fathersname;
    storage.setItem(TokenItemEnum.UserFathersname, userFathersname);

    const userUserPosition = tokenItems.user_position;
    storage.setItem(TokenItemEnum.UserPosition, userUserPosition);

    const userUserGroup = tokenItems.user_group;
    storage.setItem(TokenItemEnum.UserGroup, userUserGroup);

    const userUserPermissions = tokenItems.user_permissions;
    storage.setItem(TokenItemEnum.UserPermissions, userUserPermissions);
  }

  public static getAccessToken(): string | null
  {
    return storage.getItem(TokenItemEnum.AccessToken);
  }

  public static getRefreshToken(): string | null
  {
    return storage.getItem(TokenItemEnum.RefreshToken);
  }

  public static getExpiresIn(): number
  {
    return Number(storage.getItem(TokenItemEnum.ExpiresIn));
  }

  public static isAccessToken(): boolean
  {
    const token = storage.getItem(TokenItemEnum.AccessToken);
    if (token)
    {
      return true;
    }

    return false;
  }

  public static clearAccessToken() 
  {
    storage.removeItem(TokenItemEnum.AccessToken);
    storage.removeItem(TokenItemEnum.ExpiresIn);
    storage.removeItem(TokenItemEnum.RefreshToken);
    storage.removeItem(TokenItemEnum.UserId);
    storage.removeItem(TokenItemEnum.UserLogin);
    storage.removeItem(TokenItemEnum.UserName);
    storage.removeItem(TokenItemEnum.UserSurname);
    storage.removeItem(TokenItemEnum.UserFathersname);
    storage.removeItem(TokenItemEnum.UserRole);
    storage.removeItem(TokenItemEnum.UserPosition);
    storage.removeItem(TokenItemEnum.UserGroup);
    storage.removeItem(TokenItemEnum.UserPermissions);
  }

  public static getUserId(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserId);
  }

  public static getUserLogin(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserLogin);
  }

  public static getUserName(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserName);
  }

  public static getUserSurname(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserSurname);
  }

  public static getUserFathersName(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserFathersname);
  }

  public static getCurrentUserFio(): string | null 
  {
    return `${TokenHelper.getUserSurname()} ${TokenHelper.getUserName()} ${TokenHelper.getUserFathersName()}`;
  }

  public static getUserRole(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserRole);
  }

  public static getUserPosition(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserPosition);
  }

  public static getUserGroup(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserGroup);
  }

  public static getUserPermissions(): string | null 
  {
    return storage.getItem(TokenItemEnum.UserPermissions);
  }

  public static checkUserUserPermission(permission: string): boolean 
  {
    const accessUserPermissions = storage.getItem(TokenItemEnum.UserPermissions);
    if (accessUserPermissions)
    {
      return accessUserPermissions.includes(permission);
    }
    return false;
  }

  public static checkUserPermissions(permissions: string[] | undefined): boolean 
  {
    if (permissions === undefined) return true;

    const accessUserPermissions = storage.getItem(TokenItemEnum.UserPermissions);
    if (accessUserPermissions)
    {
      for (const element of permissions) 
      {
        const permission = element!;
        const exist = accessUserPermissions.includes(permission)
        if (exist)
        {
          return true;
        }
      }
    }
    return false;
  }
};
