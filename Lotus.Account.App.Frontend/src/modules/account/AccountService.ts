import type { IResponse } from 'lotus-core/modules/requestAndResponse';
import type { IResult } from 'lotus-core/types';
import { AuthService, type IUserAuthorizeInfo } from '#modules/auth';
import type { IAccountChangePassword } from './security';


export class AccountServiceClass
{
  // #region Const
  /**
   * Ключ сохранения темы
   */
  public static readonly ThemeSaveKey: string = 'lotus-account-theme' as const;

  /**
   * Ключ сохранения языка
   */
  public static readonly LangSaveKey: string = 'lotus-account-lang' as const; 
  // #endregion 

  // #region Instance
  private static _accountService: AccountServiceClass;

  public static get Instance(): AccountServiceClass
  {
    return this._accountService || (this._accountService = new this());
  }
  // #endregion

  // #region Main methods
  public async updateUserInfo(userInfo: IUserAuthorizeInfo):Promise<IResponse<IUserAuthorizeInfo>>
  {
    const url = 'api/Authorize/UpdateUserInfo';
  
    const response = await AuthService.authApiService.post<IResponse<IUserAuthorizeInfo>>(url, userInfo);
    return response;
  }

  public async changePassword(changePassword: IAccountChangePassword):Promise<IResult>
  {
    const url = 'api/Authorize/changePassword';
  
    const response = await AuthService.authApiService.post<IResponse, IAccountChangePassword>(url, changePassword);
    return response.result!;
  }
  // #endregion
}

/**
 * Глобальный доступ к сервису аккаунту пользователя
 */
export const AccountService = AccountServiceClass.Instance;