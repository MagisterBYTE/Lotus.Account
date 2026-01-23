import type { IUserPermission, IUserPermissionDatasave } from './types/UserPermission';

/**
 * Вспомогательный класс для работы с разрешениями
 */
export abstract class UserPermissionHelper
{
  // #region IDatasavable
  public static fromDatasave(datasave: IUserPermissionDatasave): IUserPermission
  {
    const permission: IUserPermission =
    {
      id: datasave.id,
      name: datasave.name,
      displayName: datasave.displayName,
      isNew: false
    };

    return permission;
  }

  public static fromDatasaveArray(datasaves: IUserPermissionDatasave[]): IUserPermission[]
  {
    return datasaves.map(UserPermissionHelper.fromDatasave);
  }

  public static toDatasave(permission: IUserPermission): IUserPermissionDatasave
  {
    const datasave: IUserPermissionDatasave =
    {
      id: permission.isNew ? -1 : Number(permission.id),
      name: permission.name,
      displayName: permission.displayName
    };

    return datasave;
  }

  public static toDatasaveArray(permissions: IUserPermission[]): IUserPermissionDatasave[]
  {
    return permissions.map(UserPermissionHelper.toDatasave);
  }
  // #endregion
}