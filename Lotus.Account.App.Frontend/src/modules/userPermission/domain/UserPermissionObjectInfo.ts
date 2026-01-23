import { FilterFunctionDescriptors } from 'lotus-core/modules/filter';
import { ObjectInfo, PropertyTypeDescriptors, type IPropertyDescriptor } from 'lotus-core/modules/objectInfo';
import { LocalizationAccount } from '#localization';

class UserPermissionObjectInfoClass extends ObjectInfo
{
  // #region Instance
  private static _permissionObjectInfo: UserPermissionObjectInfoClass;

  public static get Instance(): UserPermissionObjectInfoClass 
  {
    return (this._permissionObjectInfo || (this._permissionObjectInfo = new this()));
  }
  // #endregion

  constructor() 
  {
    super();
    this.Init();
  }

  private Init()
  {
    const idProp: IPropertyDescriptor =
    {
      fieldName: 'id',
      name: LocalizationAccount.data.permission.id,
      desc: LocalizationAccount.data.permission.idDesc,
      propertyTypeDesc: PropertyTypeDescriptors.Int,
      sorting:
      {
        enabled: true
      }
    };

    this.descriptors.push(idProp);

    const nameProp: IPropertyDescriptor =
    {
      fieldName: 'name',
      name: LocalizationAccount.data.permission.name,
      desc: LocalizationAccount.data.permission.nameDesc,
      propertyTypeDesc: PropertyTypeDescriptors.String,
      editing:
      {
        enabled: true,
        required: true,
        editorType: 'text'
      },
      filtering:
      {
        functionDefaultDesc: FilterFunctionDescriptors.Contains,
        enabled: true
      },
      sorting:
      {
        enabled: true
      }
    };

    this.descriptors.push(nameProp);

    const displayNameProp: IPropertyDescriptor =
    {
      fieldName: 'displayName',
      name: LocalizationAccount.data.permission.displayName,
      desc: LocalizationAccount.data.permission.displayNameDesc,
      propertyTypeDesc: PropertyTypeDescriptors.String,
      editing:
      {
        enabled: true,
        required: true,
        editorType: 'text'
      },
      filtering:
      {
        functionDefaultDesc: FilterFunctionDescriptors.Contains,
        enabled: true
      },
      sorting:
      {
        enabled: true
      }
    };

    this.descriptors.push(displayNameProp);
  }
}

/**
 * Глобальный экземпляр для доступа к описанию свойств разрешений 
 */
export const UserPermissionObjectInfo = UserPermissionObjectInfoClass.Instance;