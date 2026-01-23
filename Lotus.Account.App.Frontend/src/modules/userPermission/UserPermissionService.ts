import { RequestHelper, type IResponse } from 'lotus-core/modules/requestAndResponse';
import { AppApiService } from '#app';
import { AuthService } from '#modules/auth';
import type { IUserPermissionCreate, IUserPermissionsRequest, IUserPermissionsResponse } from './domain/types';
import type { IUserPermissionDatasave } from './domain/types/UserPermission';

type TPermissionResponse = IResponse<IUserPermissionDatasave>

export class UserPermissionServiceClass
{
  // #region Instance
  private static _userPermissionService: UserPermissionServiceClass;

  public static get Instance(): UserPermissionServiceClass
  {
    return this._userPermissionService || (this._userPermissionService = new this());
  }
  // #endregion

  // #region Main methods
  public async create(permissionCreate: IUserPermissionCreate):Promise<TPermissionResponse>
  {
    const url = 'api/UserPermission/create';
    const response = await AuthService.authApiService.post<TPermissionResponse, IUserPermissionCreate>(url, permissionCreate);
    return response;
  }

  public async update(permissionUpdate: IUserPermissionDatasave):Promise<TPermissionResponse>
  {
    const url = 'api/UserPermission/update';
  
    const response = await AuthService.authApiService.put<TPermissionResponse, IUserPermissionDatasave>(url, permissionUpdate);
    return response;
  }

  public async getAll(permissionRequest: IUserPermissionsRequest, signal?: AbortSignal):Promise<IUserPermissionsResponse>
  {
    const url = 'api/UserPermission/getAll';
    const search: URLSearchParams = RequestHelper.createURLSearchParams(permissionRequest);

    const response = await AuthService.authApiService.get<IUserPermissionsResponse>(url, search, { signal: signal });
    return response;
  }

  public async remove(id: number): Promise<IResponse> 
  {
    const baseUrl = 'api/UserPermission/delete';
    const deleteQuery: URLSearchParams = new URLSearchParams();
    deleteQuery.append('id', id.toString());
    const url = AppApiService.buildFullUrl(baseUrl, deleteQuery);

    const response = await AuthService.authApiService.delete<IResponse>(url);
    return response;
  }
  // #endregion
}

/**
 * Глобальный доступ к сервису управлениями разрешениями пользователей
 */
export const UserPermissionService = UserPermissionServiceClass.Instance;