import { IConstantable, IEditable } from 'lotus-core-react';

/**
 * Разрешение
 */
export interface IUserPermission extends IEditable, IConstantable
{
    /**
     * Идентификатор
     */
    id: number;

    /**
     * Наименование
     */
    name: string;

    /**
     * Отображаемое имя
     */
    displayName?: string;
}