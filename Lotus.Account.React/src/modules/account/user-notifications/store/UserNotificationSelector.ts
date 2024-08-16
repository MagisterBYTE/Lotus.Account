import { RootStateAccount, useAppSelectorAccount } from 'app/store';
import { IUserNotificationState } from './UserNotificationState';

export const useUserNotificationState = (): IUserNotificationState =>
{
  return useAppSelectorAccount((state: RootStateAccount) => state.userNotification);
}
