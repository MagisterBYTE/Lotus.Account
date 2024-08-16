import { FilterFunctionEnum, IPropertyDescriptor, ObjectInfoBase, PropertyTypeEnum } from 'lotus-core-react';
import { localizationAccount } from 'localization';
import { IUserNotification } from './UserNotification';

class UserNotificationObjectInfoClass extends ObjectInfoBase<IUserNotification>
{
  private static _notificationObjectInfo: UserNotificationObjectInfoClass;

  public static get Instance(): UserNotificationObjectInfoClass 
  {
    return (this._notificationObjectInfo || (this._notificationObjectInfo = new this()));
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
      name: localizationAccount.notification.id,
      desc: localizationAccount.notification.idDesc,
      propertyType: PropertyTypeEnum.Guid,
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(idProp);

    const topicProp: IPropertyDescriptor =
    {
      fieldName: 'topic',
      name: localizationAccount.notification.topic,
      desc: localizationAccount.notification.topicDesc,
      propertyType: PropertyTypeEnum.String,
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

    this.descriptors.push(topicProp);

    const senderProp: IPropertyDescriptor =
    {
      fieldName: 'sender',
      name: localizationAccount.notification.sender,
      desc: localizationAccount.notification.senderDesc,
      propertyType: PropertyTypeEnum.String,
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

    this.descriptors.push(senderProp);

    const importanceProp: IPropertyDescriptor =
    {
      fieldName: 'importance',
      name: localizationAccount.notification.importance,
      desc: localizationAccount.notification.importanceDesc,
      propertyType: PropertyTypeEnum.Enum,
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

    this.descriptors.push(importanceProp);

    const contentProp: IPropertyDescriptor =
    {
      fieldName: 'content',
      name: localizationAccount.notification.content,
      desc: localizationAccount.notification.contentDesc,
      propertyType: PropertyTypeEnum.String,
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

    this.descriptors.push(contentProp);

    const createdProp: IPropertyDescriptor =
    {
      fieldName: 'created',
      name: localizationAccount.notification.created,
      desc: localizationAccount.notification.createdDesc,
      propertyType: PropertyTypeEnum.DateTime,
      filtering:
      {
        functionDefault: FilterFunctionEnum.Equals,
        enabled: true
      },
      sorting:
      {
        enabled: true
      }
    }

    this.descriptors.push(createdProp);
  }
}

/**
 * Глобальный экземпляр для описания объекта уведомления
 */
export const UserNotificationObjectInfo = UserNotificationObjectInfoClass.Instance;
