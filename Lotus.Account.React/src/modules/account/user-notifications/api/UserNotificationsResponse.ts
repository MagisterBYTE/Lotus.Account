import { IResponsePage } from 'lotus-core-react';
import { IUserNotification } from '../domain/UserNotification';

export interface IUserNotificationsResponse extends IResponsePage<IUserNotification>
{
}