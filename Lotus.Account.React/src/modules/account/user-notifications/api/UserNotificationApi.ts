import { RequestHelper, TKey } from 'lotus-core-react';
import { AuthApiService } from 'modules/auth/api/AuthApiService';
import { IUserNotificationCreateRequest } from './UserNotificationCreateRequest';
import { IUserNotificationsRequest } from './UserNotificationsRequest';
import { IUserNotificationsResponse } from './UserNotificationsResponse';
import { IUserNotificationResponse } from './UserNotificationResponse';
import { IUserNotificationRequest } from './UserNotificationRequest';

class UserNotificationApiService extends AuthApiService 
{
  private static _UserNotificationApi: UserNotificationApiService;

  public static override get Instance(): UserNotificationApiService 
  {
    return (this._UserNotificationApi || (this._UserNotificationApi = new this()));
  }

  constructor()
  {
    super();
    this.createUserNotificationAsync = this.createUserNotificationAsync.bind(this);
    this.updateUserNotificationAsync = this.updateUserNotificationAsync.bind(this);
    this.getUserNotificationsAsync = this.getUserNotificationsAsync.bind(this);
    this.getUserNotificationAsync = this.getUserNotificationAsync.bind(this);
    this.removeUserNotificationAsync = this.removeUserNotificationAsync.bind(this);
  }

  public async createUserNotificationAsync(createParams: IUserNotificationCreateRequest): Promise<IUserNotificationResponse> 
  {
    const url = 'api/userNotification/create';

    const response = await this.post<IUserNotificationResponse, IUserNotificationCreateRequest>(url, createParams);
    return response.data;
  }

  public async updateUserNotificationAsync(updatedUserNotification: IUserNotificationRequest): Promise<IUserNotificationResponse> 
  {
    const url = 'api/userNotification/update';

    const response = await this.put<IUserNotificationResponse, IUserNotificationRequest>(url, updatedUserNotification);
    return response.data;
  }

  public async getUserNotificationAsync(id: number): Promise<IUserNotificationResponse> 
  {
    const url = 'api/userNotification/get';
    const get: URLSearchParams = new URLSearchParams();
    get.append('id', id.toString())

    const response = await this.get<IUserNotificationResponse>(url, { params: get });
    return response.data;
  }

  public async getUserNotificationsAsync(request: IUserNotificationsRequest, signal?: AbortSignal): Promise<IUserNotificationsResponse>
  {
    const search: URLSearchParams = RequestHelper.createURLSearchParams(request);

    const url = 'api/notification/getall';

    const response = await this.get<IUserNotificationsResponse>(url, { params: search, signal: signal });
    return response.data;
  }

  public async removeUserNotificationAsync(id: TKey): Promise<Response> 
  {
    const deleteQuery: URLSearchParams = new URLSearchParams();
    deleteQuery.append('id', id.toString())

    const url = 'api/userNotification/delete';

    const response = await this.delete<Response>(url, { params: deleteQuery });
    return response.data;
  }
}

/**
 * Глобальный экземпляр для доступа к Api для работы с уведомлениями пользователя
 */
export const UserNotificationApi = UserNotificationApiService.Instance;