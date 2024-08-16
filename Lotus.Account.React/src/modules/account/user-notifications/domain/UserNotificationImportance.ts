import { localizationAccount } from 'localization';

/**
 * Важность уведомления
 */
export interface IUserNotificationImportanceDesc
{
  id: number,
  name: string,
}

export const UserNotificationImportanceEnum =
  {
    /**
     * Важное
     */
    Importance:
    {
      id: 1,
      name: localizationAccount.notification.importanceChief
    },

    /**
     * Обычное
     */
    Normal:
    {
      id: 2,
      name: localizationAccount.notification.importanceNormal
    },

    /**
     * Служебное
     */
    Service:
    {
      id: 3,
      name: localizationAccount.notification.importanceService
    }
  } as const

/**
 * Тип уведомления
 */
export type TUserNotificationImportance = keyof typeof UserNotificationImportanceEnum;