import { IResponse, ISelectOption, RequestHelper, TKey } from 'lotus-core-react';
import { AuthApiService } from '../../../auth/api/AuthApiService';
import { IUserPermission } from '../domain/UserPermission';
import { IUserPermissionCreateRequest } from './UserPermissionCreateRequest';
import { IUserPermissionRequest } from './UserPermissionRequest';
import { IUserPermissionsRequest } from './UserPermissionsRequest';
import { IUserPermissionsResponse } from './UserPermissionsResponse';
import { IUserPermissionResponse } from './UserPermissionResponse';

class UserPermissionApiService extends AuthApiService 
{
  private static _UserPermissionApi: UserPermissionApiService;

  public static override get Instance(): UserPermissionApiService 
  {
    return (this._UserPermissionApi || (this._UserPermissionApi = new this()));
  }

  constructor()
  {
    super();
    this.createUserPermissionAsync = this.createUserPermissionAsync.bind(this);
    this.addUserPermissionAsync = this.addUserPermissionAsync.bind(this);
    this.updateUserPermissionAsync = this.updateUserPermissionAsync.bind(this);
    this.getUserPermissionsAsync = this.getUserPermissionsAsync.bind(this);
    this.removeUserPermissionAsync = this.removeUserPermissionAsync.bind(this);
  }

  public async createUserPermissionAsync(createParams: IUserPermissionCreateRequest): Promise<IUserPermissionResponse> 
  {
    const url = 'api/userPermission/create';

    const response = await this.post<IUserPermissionResponse, IUserPermissionCreateRequest>(url, createParams);
    return response.data;
  }

  public async addUserPermissionAsync(): Promise<IUserPermissionResponse> 
  {
    const url = 'api/userPermission/create';

    const createParams: IUserPermissionCreateRequest =
    {
      name: 'name',
      displayName: 'Новое разрешение'
    }

    const response = await this.post<IUserPermissionResponse, IUserPermissionCreateRequest>(url, createParams);
    return response.data;
  }

  public async updateUserPermissionAsync(updatedUserPermission: IUserPermissionRequest): Promise<IUserPermissionResponse> 
  {
    const url = 'api/userPermission/update';

    const response = await this.put<IUserPermissionResponse, IUserPermissionRequest>(url, updatedUserPermission);
    return response.data;
  }

  public async getUserPermissionsAsync(request: IUserPermissionsRequest, signal?: AbortSignal): Promise<IUserPermissionsResponse>
  {
    const search: URLSearchParams = RequestHelper.createURLSearchParams(request);

    const url = 'api/userPermission/getall';

    const response = await this.get<IUserPermissionsResponse>(url, { params: search, signal: signal });
    return response.data;
  }

  public async getUserPermissionsAsOptionsAsync(): Promise<ISelectOption[]>
  {
    const search: URLSearchParams = RequestHelper.createURLSearchParams();

    const url = 'api/userPermission/getall';

    const response = await this.get<IUserPermissionsResponse>(url, { params: search });

    const payload: IUserPermission[] = response.data.payload!;

    const options: ISelectOption[] = payload.map((x) =>
    {
      const option: ISelectOption = { text: x.displayName!, value: x.id };
      return option;
    });

    return Promise.resolve<ISelectOption[]>(options);
  }

  public async removeUserPermissionAsync(id: TKey): Promise<IResponse> 
  {
    const deleteQuery: URLSearchParams = new URLSearchParams();
    deleteQuery.append('id', id.toString())

    const url = 'api/userPermission/delete';

    const response = await this.delete<IResponse>(url, { params: deleteQuery });
    return response.data;
  }
}

/**
 * Глобальный экземпляр для доступа к Api для работы с разрешениями 
 */
export const UserPermissionApi = UserPermissionApiService.Instance;