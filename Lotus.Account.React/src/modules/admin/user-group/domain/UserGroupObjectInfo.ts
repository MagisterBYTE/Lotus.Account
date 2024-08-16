import { FilterFunctionEnum, IPropertyDescriptor, ObjectInfoBase, PropertyTypeEnum, ValidationResultSuccess } from 'lotus-core-react';
import { localizationAccount } from 'localization';
import { IUserGroup } from './UserGroup';

class UserGroupObjectInfoClass extends ObjectInfoBase<IUserGroup>
{
  private static _groupObjectInfo: UserGroupObjectInfoClass;

  public static get Instance(): UserGroupObjectInfoClass 
  {
    return (this._groupObjectInfo || (this._groupObjectInfo = new this()));
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
      name: localizationAccount.group.id,
      desc: localizationAccount.group.idDesc,
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
      name: localizationAccount.group.name,
      desc: localizationAccount.group.nameDesc,
      propertyType: PropertyTypeEnum.String,
      editing:
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: () => { return ValidationResultSuccess }
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
      name: localizationAccount.group.displayName,
      desc: localizationAccount.group.displayNameDesc,
      propertyType: PropertyTypeEnum.String,
      editing:
      {
        enabled: true,
        required: true,
        editorType: 'text',
        onValidation: () => { return ValidationResultSuccess }
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
 * Глобальный экземпляр для доступа к описанию свойств группы пользователя
 */
export const UserGroupObjectInfo = UserGroupObjectInfoClass.Instance;