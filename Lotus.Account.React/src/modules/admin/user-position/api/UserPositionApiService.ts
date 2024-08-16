import { IResponse, RequestHelper, TKey } from 'lotus-core-react';
import { AuthApiService } from '../../../auth/api/AuthApiService';
import { IUserPosition } from '../domain/UserPosition';
import { IUserPositionCreateRequest } from './UserPositionCreateRequest';
import { IUserPositionUpdateRequest } from './UserPositionRequest';
import { IUserPositionsRequest } from './UserPositionsRequest';
import { IUserPositionsResponse } from './UserPositionsResponse';
import { IUserPositionResponse } from './UserPositionResponse';

class UserPositionApiService extends AuthApiService 
{
  private static _UserPositionApi: UserPositionApiService;

  public static override get Instance(): UserPositionApiService 
  {
    return (this._UserPositionApi || (this._UserPositionApi = new this()));
  }

  constructor()
  {
    super();
    this.createUserPositionAsync = this.createUserPositionAsync.bind(this);
    this.addUserPositionAsync = this.addUserPositionAsync.bind(this);
    this.updateUserPositionAsync = this.updateUserPositionAsync.bind(this);
    this.getUserPositionsAsync = this.getUserPositionsAsync.bind(this);
    this.removeUserPositionAsync = this.removeUserPositionAsync.bind(this);
  }

  public async createUserPositionAsync(createParams: IUserPositionCreateRequest): Promise<IUserPositionResponse> 
  {
    const url = 'api/userPosition/create';

    const response = await this.post<IUserPositionResponse, IUserPositionCreateRequest>(url, createParams);
    return response.data;
  }

  public async addUserPositionAsync(): Promise<IUserPositionResponse> 
  {
    const url = 'api/userPosition/create';

    const createParams: IUserPositionCreateRequest =
    {
      name: 'Новая должность',
      displayName: 'Краткое имя'
    }

    const response = await this.post<IUserPositionResponse, IUserPositionCreateRequest>(url, createParams);
    return response.data;
  }

  public async updateUserPositionAsync(updatedUserPosition: IUserPositionUpdateRequest): Promise<IUserPositionResponse> 
  {
    const url = 'api/userPosition/update';

    const response = await this.put<IUserPositionResponse, IUserPositionUpdateRequest>(url, updatedUserPosition);
    return response.data;
  }

  public async getUserPositionAsync(id: number): Promise<IUserPosition> 
  {
    const url = 'api/userPosition/get';

    const get: URLSearchParams = new URLSearchParams();
    get.append('id', id.toString())

    const response = await this.get<IUserPosition>(url, { params: get });
    return response.data;
  }

  public async getUserPositionsAsync(request: IUserPositionsRequest, signal?: AbortSignal): Promise<IUserPositionsResponse>
  {
    const search: URLSearchParams = RequestHelper.createURLSearchParams(request);

    const url = 'api/userPosition/getall';

    const response = await this.get<IUserPositionsResponse>(url, { params: search, signal: signal });
    return response.data;
  }

  public async removeUserPositionAsync(id: TKey): Promise<IResponse> 
  {
    const deleteQuery: URLSearchParams = new URLSearchParams();
    deleteQuery.append('id', id.toString())

    const url = 'api/userPosition/delete';

    const response = await this.delete<IResponse>(url, { params: deleteQuery });
    return response.data;
  }
}

/**
 * Глобальный экземпляр для доступа к Api для работы с должностями 
 */
export const UserPositionApi = UserPositionApiService.Instance;