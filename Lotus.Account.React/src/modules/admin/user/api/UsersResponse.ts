import { IResponsePage } from 'lotus-core-react';
import { IUser } from '../domain/User';

export interface IUsersResponse extends IResponsePage<IUser>
{
}