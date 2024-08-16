import { IConstantable, IEditable } from 'lotus-core-react';

export interface IUserRole extends IEditable, IConstantable
{
    id: number;
    name: string;
    displayName?: string;
    permissionIds: number[];
}