import { IResponse, RequestHelper, TKey } from 'lotus-core-react';
import { AuthApiService } from '../../../auth/api/AuthApiService';
import { IUserRole } from '../domain/UserRole';
import { IUserRoleCreateRequest } from './UserRoleCreateRequest';
import { IUserRoleUpdateRequest } from './UserRoleUpdateRequest';
import { IUserRolesRequest } from './UserRolesRequest';
import { IUserRolesResponse } from './UserRolesResponse';
import { IUserRoleResponse } from './UserRoleResponse';

class UserRoleApiService extends AuthApiService 
{
  private static _UserRoleApi: UserRoleApiService;

  public static override get Instance(): UserRoleApiService 
  {
    return (this._UserRoleApi || (this._UserRoleApi = new this()));
  }

  constructor()
  {
    super();
    this.createUserRoleAsync = this.createUserRoleAsync.bind(this);
    this.addUserRoleAsync = this.addUserRoleAsync.bind(this);
    this.updateUserRoleAsync = this.updateUserRoleAsync.bind(this);
    this.getUserRoleAsync = this.getUserRoleAsync.bind(this);
    this.getUserRolesAsync = this.getUserRolesAsync.bind(this);
    this.removeUserRoleAsync = this.removeUserRoleAsync.bind(this);
  }

  public async createUserRoleAsync(createParams: IUserRoleCreateRequest): Promise<IUserRoleResponse> 
  {
    const url = 'api/userRole/create';

    const response = await this.post<IUserRoleResponse, IUserRoleCreateRequest>(url, createParams);
    return response.data;
  }

  public async addUserRoleAsync(): Promise<IUserRoleResponse> 
  {
    const url = 'api/userRole/create';

    const createParams: IUserRoleCreateRequest =
    {
      name: 'name',
      displayName: 'Новая роль'
    }

    const response = await this.post<IUserRoleResponse, IUserRoleCreateRequest>(url, createParams);
    return response.data;
  }

  public async updateUserRoleAsync(updatedUserRole: IUserRoleUpdateRequest): Promise<IUserRoleResponse> 
  {
    const url = 'api/userRole/update';

    const response = await this.put<IUserRoleResponse, IUserRoleUpdateRequest>(url, updatedUserRole);
    return response.data;
  }

  public async getUserRoleAsync(id: number): Promise<IUserRole> 
  {
    const url = 'api/userRole/get';

    const get: URLSearchParams = new URLSearchParams();
    get.append('id', id.toString())

    const response = await this.get<IUserRole>(url, { params: get });
    return response.data;
  }

  public async getUserRolesAsync(request: IUserRolesRequest, signal?: AbortSignal): Promise<IUserRolesResponse>
  {
    const url = 'api/userRole/getall';

    const search: URLSearchParams = RequestHelper.createURLSearchParams(request);

    const response = await this.get<IUserRolesResponse>(url, { params: search, signal: signal });

    return response.data;
  }

  public async removeUserRoleAsync(id: TKey): Promise<IResponse> 
  {
    const url = 'api/userRole/delete';

    const deleteQuery: URLSearchParams = new URLSearchParams();
    deleteQuery.append('id', id.toString())

    const response = await this.delete<IResponse>(url, { params: deleteQuery });
    return response.data;
  }
}

/**
 * Глобальный экземпляр для доступа к Api для работы с ролями 
 */
export const UserRoleApi = UserRoleApiService.Instance;