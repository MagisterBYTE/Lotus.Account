import { createContext } from 'react';
import type { UserAuthorizeInfo } from '#modules/auth';

export interface IAuthContextType
{
  userAuthInfo:UserAuthorizeInfo|undefined,
  setUserAuthInfo: (userAuthInfo:UserAuthorizeInfo|undefined) => void;
}

export const AuthContext = createContext<IAuthContextType | undefined>(undefined);