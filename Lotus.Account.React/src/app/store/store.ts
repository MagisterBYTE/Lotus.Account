import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit'
import { userSlice } from 'modules/admin/user/store/UserSlice'
import { userNotificationSlice } from 'modules/account/user-notifications/store/UserNotificationSlice'

export function makeStoreAccount() 
{
  return configureStore(
    {
      reducer:
      {
        user: userSlice.reducer,
        userNotification: userNotificationSlice.reducer
      }
    })
}

export const storeAccount = makeStoreAccount();

export type RootStateAccount = ReturnType<typeof storeAccount.getState>;

export type AppDispatchAccount = typeof storeAccount.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootStateAccount,
  unknown,
  Action<string>
>