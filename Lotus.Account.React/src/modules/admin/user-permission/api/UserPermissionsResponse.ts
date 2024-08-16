import { IResponsePage } from 'lotus-core-react';
import { IUserPermission } from '../domain/UserPermission';

export interface IUserPermissionsResponse extends IResponsePage<IUserPermission>
{
}