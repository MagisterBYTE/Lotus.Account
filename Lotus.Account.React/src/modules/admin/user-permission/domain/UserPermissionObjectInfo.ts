import { FilterFunctionEnum, IPropertyDescriptor, ObjectInfoBase, PropertyTypeEnum, localizationCore } from 'lotus-core-react';
import { localizationAccount } from 'localization';
import { IUserPermission } from './UserPermission';

class UserPermissionObjectInfoClass extends ObjectInfoBase<IUserPermission>
{
  private static _permissionObjectInfo: UserPermissionObjectInfoClass;

  public static get Instance(): UserPermissionObjectInfoClass 
  {
    return (this._permissionObjectInfo || (this._permissionObjectInfo = new this()));
  }

  constructor() 
  {
    super()
    this.Init();
  }

  private Init()
  {
    const idProp: IPropertyDescriptor =
    {
      fieldName: 'id',
      name: localizationAccount.permission.id,
      desc: localizationAccount.permission.idDesc,
      propertyType: PropertyTypeEnum.Guid,
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(idProp);

    const nameProp: IPropertyDescriptor =
    {
      fieldName: 'name',
      name: localizationAccount.permission.name,
      desc: localizationAccount.permission.nameDesc,
      propertyType: PropertyTypeEnum.String,
      editing:
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IUserPermission | null) =>
        {
          if (item && item.name === '')
          {
            return { error: true, text: localizationCore.validation.required };
          }
          if (item && item.name.length > 20)
          {
            return { error: true, text: localizationCore.validation.maxLength(20) };
          }
          return { error: false, text: '' };
        }
      },
      filtering:
      {
        functionDefault: FilterFunctionEnum.Contains,
        enabled: true
      },
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(nameProp);

    const displayNameProp: IPropertyDescriptor =
    {
      fieldName: 'displayName',
      name: localizationAccount.permission.displayName,
      desc: localizationAccount.permission.displayNameDesc,
      propertyType: PropertyTypeEnum.String,
      editing:
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IUserPermission | null) =>
        {
          if (item && item.displayName === '')
          {
            return { error: true, text: localizationCore.validation.required };
          }
          if (item && item.displayName && item.displayName.length > 40)
          {
            return { error: true, text: localizationCore.validation.maxLength(40) };
          }
          return { error: false, text: '' };
        }
      },
      filtering:
      {
        functionDefault: FilterFunctionEnum.Contains,
        enabled: true
      },
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(displayNameProp);
  }
}

/**
 * Глобальный экземпляр для доступа к описанию свойств разрешений 
 */
export const UserPermissionObjectInfo = UserPermissionObjectInfoClass.Instance;