import
{
  ObjectInfoBase, IPropertyDescriptor, PropertyTypeEnum, FilterFunctionEnum,
  ValidationResultSuccess, localizationCore
} from 'lotus-core-react';
import { localizationAccount } from 'localization';
import { IUserRole } from './UserRole';

export class UserRoleObjectInfoClass extends ObjectInfoBase<IUserRole>
{
  private static _roleObjectInfo: UserRoleObjectInfoClass;

  public static get Instance(): UserRoleObjectInfoClass 
  {
    return (this._roleObjectInfo || (this._roleObjectInfo = new this()));
  }

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
      name: localizationAccount.role.id,
      desc: localizationAccount.role.idDesc,
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
      name: localizationAccount.role.name,
      desc: localizationAccount.role.nameDesc,
      propertyType: PropertyTypeEnum.String,
      editing:
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IUserRole | null) =>
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
      name: localizationAccount.role.displayName,
      desc: localizationAccount.role.displayNameDesc,
      propertyType: PropertyTypeEnum.String,
      editing:
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: (item: IUserRole | null) =>
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

    const permissionIdsProp: IPropertyDescriptor =
    {
      fieldName: 'permissionIds',
      name: localizationAccount.role.permissionIds,
      desc: localizationAccount.role.permissionIdsDesc,
      propertyType: PropertyTypeEnum.Integer,
      isArray: true,
      editing:
      {
        enabled: true,
        required: true,
        editorType: 'multi-select',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        onValidation: (_: IUserRole | null) => { return ValidationResultSuccess }
      },
      filtering:
      {
        functionDefault: FilterFunctionEnum.IncludeAny,
        enabled: true
      },
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(permissionIdsProp);
  }
}

/**
 * Глобальный экземпляр для доступа к описанию свойств ролей 
 */
export const UserRoleObjectInfo = UserRoleObjectInfoClass.Instance;