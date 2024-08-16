import { RequestHelper } from 'lotus-core-react';
import { AuthApiService } from 'modules/auth/api/AuthApiService';
import { IUser } from '../domain/User';
import { IUserCreateRequest } from './UserCreateRequest';
import { IUsersRequest } from './UsersRequest';
import { IUsersResponse } from './UsersResponse';
import { IUserResponse } from './UserResponse';

/**
 * Api для работы с пользователем 
 */
class UserApiService extends AuthApiService 
{
  private static _UserApi: UserApiService;

  public static override get Instance(): UserApiService 
  {
    return (this._UserApi || (this._UserApi = new this()));
  }

  constructor()
  {
    super();
    this.createUserAsync = this.createUserAsync.bind(this);
    this.updateUserAsync = this.updateUserAsync.bind(this);
    this.getUserAsync = this.getUserAsync.bind(this);
    this.getUsersAsync = this.getUsersAsync.bind(this);
    this.removeUserAsync = this.removeUserAsync.bind(this);
  }

  public async createUserAsync(registerParams: IUserCreateRequest): Promise<IUserResponse> 
  {
    const url = 'connect/token';

    const response = await this.post<IUserResponse, IUserCreateRequest>(url, registerParams);
    return response.data;
  }

  public async updateUserAsync(updatedUser: IUser): Promise<IUser> 
  {
    const url = 'connect/token';

    const response = await this.put<IUser, IUser>(url, updatedUser);
    return response.data;
  }

  public async getUserAsync(id: string): Promise<IUser> 
  {
    const url = 'connect/token';

    const get: URLSearchParams = new URLSearchParams();
    get.append('id', id.toString())

    const response = await this.get<IUser>(url, { params: get });
    return response.data;

    // return new Promise<IUser>((resolve)=>
    // {
    //   setTimeout(() => resolve(mockUserData[0]), 500)
    // });
  }

  public async getUsersAsync(request: IUsersRequest, signal?: AbortSignal): Promise<IUsersResponse>
  {
    const url = 'connect/token';

    const search: URLSearchParams = RequestHelper.createURLSearchParams(request);

    const response = await this.get<IUsersResponse>(url, { params: search, signal: signal });
    return response.data;
  }

  public async removeUserAsync(id: string): Promise<boolean> 
  {
    const url = 'connect/token';

    const deleteQuery: URLSearchParams = new URLSearchParams();
    deleteQuery.append('id', id.toString())

    const response = await this.delete<boolean>(url, { params: deleteQuery });
    return response.data;
  }
}

/**
 * Глобальный экземпляр для доступа к Api для работы с пользователем 
 */
export const UserApi = UserApiService.Instance;