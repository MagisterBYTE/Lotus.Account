import { IConstantable, IEditable } from 'lotus-core-react';

/**
 * Группа пользователя
 */
export interface IUserGroup extends IEditable, IConstantable
{
    /**
     * Идентификатор группы
     */
    id: number;

    /**
     * Наименование группы
     */
    name: string;

    /**
     * Отображаемое наименование группы
     */
    displayName?: string;
}