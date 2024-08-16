import { RootStateAccount, useAppSelectorAccount } from 'app/store';
import { IUser } from '../domain/User'
import { IUsersRequest } from '../api/UsersRequest'
import { IUserState } from './UserState'

export const useUserState = (): IUserState =>
{
  return useAppSelectorAccount((state: RootStateAccount) => state.user)
}

export const useUserStateViewUsers = (): IUser[] | undefined =>
{
  return useAppSelectorAccount((state: RootStateAccount) => state.user.viewUsers?.payload)
}

export const useUserStateFilterViewUsers = (): IUsersRequest | undefined =>
{
  return useAppSelectorAccount((state: RootStateAccount) => state.user.filterViewUsers)
}
