import { TColorType } from 'lotus-core-react';
import { localizationAccount } from 'localization';
import { IUserNotificationImportanceDesc, TUserNotificationImportance, UserNotificationImportanceEnum } from '../domain/UserNotificationImportance';

export class UserNotificationImportanceHelper
{
  public static getDesc(notification: TUserNotificationImportance): IUserNotificationImportanceDesc
  {
    switch (notification)
    {
      case 'Importance': return UserNotificationImportanceEnum.Importance;
      case 'Normal': return UserNotificationImportanceEnum.Normal;
      case 'Service': return UserNotificationImportanceEnum.Service;
    }

    return UserNotificationImportanceEnum.Normal;
  }

  public static getType(notification: IUserNotificationImportanceDesc): TUserNotificationImportance
  {
    switch (notification)
    {
      case UserNotificationImportanceEnum.Importance: return 'Importance';
      case UserNotificationImportanceEnum.Normal: return 'Normal';
      case UserNotificationImportanceEnum.Service: return 'Service';
    }

    return 'Normal';
  }

  public static convertToColor(importance: TUserNotificationImportance | undefined): TColorType
  {
    if (!importance) return 'primary';

    switch (importance)
    {
      case 'Importance': return 'warning';
      case 'Normal': return 'primary';
      case 'Service': return 'primary';
    }

    return 'primary';
  }

  public static convertToText(importance: TUserNotificationImportance | undefined): string
  {
    if (!importance) return '';

    switch (importance)
    {
      case 'Importance': return localizationAccount.notification.importanceChief;
      case 'Normal': return localizationAccount.notification.importanceNormal;
      case 'Service': return localizationAccount.notification.importanceService;
    }

    return '';
  }
}