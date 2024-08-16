import { IResponse, ISelectOption, RequestHelper, TKey } from 'lotus-core-react';
import { AuthApiService } from '../../../auth/api/AuthApiService';
import { IUserGroup } from '../domain/UserGroup';
import { IUserGroupCreateRequest } from './UserGroupCreateRequest';
import { IUserGroupRequest } from './UserGroupRequest';
import { IUserGroupsRequest } from './UserGroupsRequest';
import { IUserGroupsResponse } from './UserGroupsResponse';
import { IUserGroupResponse } from './UserGroupResponse';


class UserGroupApiService extends AuthApiService 
{
  private static _UserGroupApi: UserGroupApiService;

  public static override get Instance(): UserGroupApiService 
  {
    return (this._UserGroupApi || (this._UserGroupApi = new this()));
  }

  constructor()
  {
    super();
    this.createUserGroupAsync = this.createUserGroupAsync.bind(this);
    this.addUserGroupAsync = this.addUserGroupAsync.bind(this);
    this.updateUserGroupAsync = this.updateUserGroupAsync.bind(this);
    this.getUserGroupsAsync = this.getUserGroupsAsync.bind(this);
    this.getUserGroupAsync = this.getUserGroupAsync.bind(this);
    this.getUserGroupsAsOptionsAsync = this.getUserGroupsAsOptionsAsync.bind(this);
    this.removeUserGroupAsync = this.removeUserGroupAsync.bind(this);
  }

  public async createUserGroupAsync(createParams: IUserGroupCreateRequest): Promise<IUserGroupResponse> 
  {
    const url = 'api/userGroup/create';

    const response = await this.post<IUserGroupResponse, IUserGroupCreateRequest>(url, createParams);
    return response.data;
  }

  public async addUserGroupAsync(): Promise<IUserGroupResponse> 
  {
    const url = 'api/userGroup/create';

    const createParams: IUserGroupCreateRequest =
    {
      name: 'Новая группа',
      displayName: 'Краткое имя'
    }

    const response = await this.post<IUserGroupResponse, IUserGroupCreateRequest>(url, createParams);
    return response.data;
  }

  public async updateUserGroupAsync(updatedUserGroup: IUserGroupRequest): Promise<IUserGroupResponse> 
  {
    const url = 'api/userGroup/update';

    const response = await this.put<IUserGroupResponse, IUserGroupRequest>(url, updatedUserGroup);
    return response.data;
  }

  public async getUserGroupsAsync(request: IUserGroupsRequest, signal?: AbortSignal): Promise<IUserGroupsResponse>
  {
    const search: URLSearchParams = RequestHelper.createURLSearchParams(request);

    const url = 'api/userGroup/getall';

    const response = await this.get<IUserGroupsResponse>(url, { params: search, signal: signal });
    return response.data;
  }

  public async getUserGroupsAsOptionsAsync(): Promise<ISelectOption[]>
  {
    const search: URLSearchParams = RequestHelper.createURLSearchParams();

    const url = 'api/userGroup/getall';

    const response = await this.get<IUserGroupsResponse>(url, { params: search });

    const payload: IUserGroup[] = response.data.payload!;

    const options: ISelectOption[] = payload.map((x) =>
    {
      const option: ISelectOption = { text: x.name!, value: String(x.id) };
      return option;
    });

    return Promise.resolve<ISelectOption[]>(options);
  }

  public async getUserGroupAsync(id: number): Promise<IUserGroupResponse> 
  {
    const url = 'api/userGroup/get';

    const get: URLSearchParams = new URLSearchParams();
    get.append('id', id.toString())

    const response = await this.get<IUserGroupResponse>(url, { params: get });
    return response.data;
  }

  public async removeUserGroupAsync(id: TKey): Promise<IResponse> 
  {
    const deleteQuery: URLSearchParams = new URLSearchParams();
    deleteQuery.append('id', id.toString())

    const url = 'api/userGroup/delete';

    const response = await this.delete<IResponse>(url, { params: deleteQuery });
    return response.data;
  }
}

/**
 * Глобальный экземпляр для доступа к Api для работы с группами 
 */
export const UserGroupApi = UserGroupApiService.Instance;