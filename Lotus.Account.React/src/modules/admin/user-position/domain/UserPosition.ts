import { IConstantable, IEditable } from 'lotus-core-react';

export interface IUserPosition extends IEditable, IConstantable
{
    id: number;
    name: string;
    displayName?: string;
}